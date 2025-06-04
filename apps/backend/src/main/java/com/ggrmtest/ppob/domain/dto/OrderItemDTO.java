package com.ggrmtest.ppob.domain.dto;

import com.ggrmtest.ppob.infrastructure.persistence.entity.CartItem;
import com.ggrmtest.ppob.infrastructure.persistence.entity.OrderItem;
import java.math.BigDecimal;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class OrderItemDTO {

  private Long orderItemId;
  private Long productId;
  private Integer quantity;
  private String inputNumber;
  private BigDecimal price;
  private ProductDTO product;

  public static OrderItemDTO fromOrderItem(OrderItem orderItem) {
    return new OrderItemDTO()
      .setOrderItemId(orderItem.getId())
      .setProductId(orderItem.getProduct().getId())
      .setQuantity(orderItem.getQuantity())
      .setInputNumber(orderItem.getInputNumber())
      .setPrice(orderItem.getPrice())
      .setProduct(ProductDTO.fromEntity(orderItem.getProduct()));
  }

  public OrderItem toOrderItem(OrderItem orderItem) {
    return orderItem
      .setId(orderItemId)
      .setQuantity(quantity)
      .setPrice(price)
      .setInputNumber(inputNumber);
  }

  public static OrderItem fromCartItem(CartItem cartItem) {
    return new OrderItem()
      .setQuantity(cartItem.getCartQuantity())
      .setPrice(cartItem.getCartPrice())
      .setInputNumber(cartItem.getInputNumber())
      .setProduct(cartItem.getProduct());
  }
}
