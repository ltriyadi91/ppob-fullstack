package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.CartItemDTO;
import com.ggrmtest.ppob.infrastructure.persistence.entity.Cart;
import com.ggrmtest.ppob.infrastructure.persistence.entity.CartItem;
import com.ggrmtest.ppob.infrastructure.persistence.exception.ApiRequestException;
import com.ggrmtest.ppob.infrastructure.persistence.repository.CartItemRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.CartRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.ProductRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.UserRepository;
import java.math.BigDecimal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {

  private final CartItemRepository cartItemRepository;
  private final CartRepository cartRepository;
  private final ProductRepository productRepository;
  private final UserRepository userRepository;

  @Override
  public CartItemDTO saveCartItem(Long userId, Long productId) {
    var product = productRepository
      .findById(productId)
      .orElseThrow(() ->
        new ApiRequestException("Product not found", HttpStatus.NOT_FOUND)
      );

    var cart = cartRepository.findByUserId(userId);
    if (cart == null) {
      var user = userRepository.findById(userId);
      cart =
        cartRepository.save(
          new Cart()
            .setUser(user.get())
            .setTotalPrice(BigDecimal.ZERO)
            .setTotalQuantity(0)
        );
    }

    var cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId);
    // Because PPOB can only buy with only one quantity product at a time,
    // so we need to check if the cart item already exists
    if (cartItem != null) {
      throw new ApiRequestException("Cart item already exists", HttpStatus.BAD_REQUEST);
    }
    var finalPrice = product.getIsDiscount()
      ? product.getNewPriceNumeric()
      : product.getPriceNumeric();
    cartItem = new CartItem();
    cartItem.setCart(cart);
    cartItem.setProduct(product);
    cartItem.setCartQuantity(1);
    cartItem.setCartPrice(finalPrice);
    cartItem = cartItemRepository.save(cartItem);

    cart.setTotalPrice(cart.getTotalPrice().add(finalPrice));
    cart.setTotalQuantity(cart.getTotalQuantity() + 1);
    cartRepository.save(cart);

    return CartItemDTO.fromCartItem(cartItem);
  }
}
