package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.OrderDTO;
import com.ggrmtest.ppob.domain.dto.OrderItemDTO;
import com.ggrmtest.ppob.infrastructure.persistence.entity.Order;
import com.ggrmtest.ppob.infrastructure.persistence.exception.ApiRequestException;
import com.ggrmtest.ppob.infrastructure.persistence.repository.OrderItemRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.OrderRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderQueryServiceImpl implements OrderQueryService {

  private final OrderRepository orderRepository;
  private final OrderItemRepository orderItemRepository;

  @Override
  public OrderDTO findOrderByUserId(Long userId) {
    var order = orderRepository
      .findByUserId(userId)
      .orElseThrow(() -> new ApiRequestException("Order not found", HttpStatus.NOT_FOUND)
      );

    var orderItems = orderItemRepository
      .findByOrderId(order.getId())
      .stream()
      .map(OrderItemDTO::fromOrderItem)
      .toList();

    var dto = OrderDTO.fromOrder(order);
    dto.setOrderItems(orderItems);

    return dto;
  }

  @Override
  public Page<OrderDTO> findAllPaginatedOrders(String searchTerm, Pageable pageable) {
    // Get all orders first
    List<Order> allOrders = orderRepository.findAll();

    // Apply pagination manually
    int start = (int) pageable.getOffset();
    int end = Math.min((start + pageable.getPageSize()), allOrders.size());

    // Create a sublist based on pagination parameters
    List<Order> pageContent = start < end ? allOrders.subList(start, end) : List.of();

    // Convert to DTOs
    List<OrderDTO> orderDTOs = pageContent
      .stream()
      .map(order -> {
        var dto = OrderDTO.fromOrder(order);
        dto.setOrderItems(
          orderItemRepository
            .findByOrderId(order.getId())
            .stream()
            .map(OrderItemDTO::fromOrderItem)
            .toList()
        );
        return dto;
      })
      .collect(Collectors.toList());

    // Create and return a Page object
    return new PageImpl<>(orderDTOs, pageable, allOrders.size());
  }
}
