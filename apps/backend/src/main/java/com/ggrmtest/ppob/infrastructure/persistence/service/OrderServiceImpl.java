package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.common.enumeration.OrderStatus;
import com.ggrmtest.ppob.domain.dto.DirectOrderDTO;
import com.ggrmtest.ppob.domain.dto.OrderDTO;
import com.ggrmtest.ppob.domain.dto.OrderItemDTO;
import com.ggrmtest.ppob.infrastructure.persistence.entity.Order;
import com.ggrmtest.ppob.infrastructure.persistence.entity.OrderItem;
import com.ggrmtest.ppob.infrastructure.persistence.exception.ApiRequestException;
import com.ggrmtest.ppob.infrastructure.persistence.repository.CartItemRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.CartRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.OrderItemRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.OrderRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.ProductRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

  private final OrderRepository orderRepository;
  private final OrderItemRepository orderItemRepository;
  private final CartRepository cartRepository;
  private final CartItemRepository cartItemRepository;
  private final UserRepository userRepository;
  private final ProductRepository productRepository;

  @Override
  public OrderDTO placeOrderFromCart(Long userId) {
    var user = userRepository
      .findById(userId)
      .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));

    orderRepository
      .findByUserId(userId)
      .ifPresent(order -> {
        throw new ApiRequestException(
          "User already has an order",
          HttpStatus.BAD_REQUEST
        );
      });

    var cart = cartRepository.findByUserId(userId);

    if (cart == null) {
      throw new ApiRequestException("Cart not found", HttpStatus.NOT_FOUND);
    }

    // Create order
    var order = new Order();
    order.setUser(user);
    order.setTotalAmount(cart.getTotalPrice());
    order.setStatus(OrderStatus.PENDING);
    orderRepository.save(order);

    // Create order and order dto items
    List<OrderItem> orderItems = new ArrayList<>();
    List<OrderItemDTO> orderItemDTOs = new ArrayList<>();

    cartItemRepository
      .findByCartId(cart.getId())
      .forEach(cartItem -> {
        var orderItem = OrderItemDTO.fromCartItem(cartItem);
        orderItem.setOrder(order);

        orderItems.add(orderItem);
        orderItemDTOs.add(OrderItemDTO.fromOrderItem(orderItem));
      });

    orderItemRepository.saveAll(orderItems);
    var orderDTO = OrderDTO.fromOrder(order);
    orderDTO.setOrderItems(orderItemDTOs);

    cartItemRepository.deleteAll(cartItemRepository.findByCartId(cart.getId()));
    cartRepository.delete(cart);

    return orderDTO;
  }

  @Override
  public OrderDTO placeDirectOrder(Long userId, DirectOrderDTO directOrderDTO) {
    var user = userRepository
      .findById(userId)
      .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));

    orderRepository
      .findByUserId(userId)
      .ifPresent(order -> {
        throw new ApiRequestException(
          "User already has an order",
          HttpStatus.BAD_REQUEST
        );
      });

    var product = productRepository
      .findById(directOrderDTO.getProductId())
      .orElseThrow(() ->
        new ApiRequestException("Product not found", HttpStatus.NOT_FOUND)
      );

    if (!product.getIsAvailable()) {
      throw new ApiRequestException("Product is not available", HttpStatus.BAD_REQUEST);
    }

    var finalPrice = product.getIsDiscount()
      ? product.getNewPriceNumeric()
      : product.getPriceNumeric();

    // Create order
    var order = new Order();
    order.setUser(user);
    order.setTotalAmount(finalPrice);
    order.setStatus(OrderStatus.PENDING);
    orderRepository.save(order);

    // Create order and order dto items
    OrderItem orderItem = new OrderItem();
    orderItem.setProduct(product);
    orderItem.setQuantity(1);
    orderItem.setPrice(finalPrice);
    orderItem.setOrder(order);
    orderItemRepository.save(orderItem);

    var orderDTO = OrderDTO.fromOrder(order);

    return orderDTO;
  }
}
