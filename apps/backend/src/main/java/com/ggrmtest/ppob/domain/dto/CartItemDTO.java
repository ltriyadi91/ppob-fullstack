package com.ggrmtest.ppob.domain.dto;

import com.ggrmtest.ppob.infrastructure.persistence.entity.CartItem;
import java.math.BigDecimal;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class CartItemDTO {

  private Long id;
  private Long cartId;
  private Long productId;
  private Integer cartQuantity;
  private BigDecimal cartPrice;
  private ProductDTO product;

  public static CartItemDTO fromCartItem(CartItem cartItem) {
    return new CartItemDTO()
      .setId(cartItem.getId())
      .setCartId(cartItem.getCart().getId())
      .setProductId(cartItem.getProduct().getId())
      .setCartQuantity(cartItem.getCartQuantity())
      .setCartPrice(cartItem.getCartPrice())
      .setProduct(ProductDTO.fromEntity(cartItem.getProduct()));
  }

  public CartItem toCartItem(CartItem cartItem) {
    return cartItem.setCartQuantity(cartQuantity).setCartPrice(cartPrice);
  }
}
