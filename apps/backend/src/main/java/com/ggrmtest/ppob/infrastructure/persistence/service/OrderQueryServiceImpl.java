package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.OrderDTO;
import com.ggrmtest.ppob.domain.dto.OrderItemDTO;
import com.ggrmtest.ppob.infrastructure.persistence.exception.ApiRequestException;
import com.ggrmtest.ppob.infrastructure.persistence.repository.OrderItemRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
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
}
