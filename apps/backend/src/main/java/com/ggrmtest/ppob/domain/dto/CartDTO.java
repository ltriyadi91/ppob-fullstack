package com.ggrmtest.ppob.domain.dto;

import com.ggrmtest.ppob.infrastructure.persistence.entity.Cart;
import java.math.BigDecimal;
import java.util.List;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class CartDTO {

  private Long cartId;
  private BigDecimal totalPrice;
  private Integer totalItem;
  private UserDetailDTO userDetail;
  private String inputNumber;
  private List<CartItemDTO> cartItems;

  public static CartDTO fromCart(Cart cart) {
    return new CartDTO()
      .setCartId(cart.getId())
      .setTotalPrice(cart.getTotalPrice())
      .setTotalItem(cart.getTotalQuantity())
      .setUserDetail(UserDetailDTO.fromUser(cart.getUser()));
  }

  public Cart toCart(Cart cart) {
    return cart.setId(cartId).setTotalPrice(totalPrice).setTotalQuantity(totalItem);
  }
}
