package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.CartDTO;
import com.ggrmtest.ppob.domain.dto.CartItemDTO;
import com.ggrmtest.ppob.infrastructure.persistence.exception.ApiRequestException;
import com.ggrmtest.ppob.infrastructure.persistence.repository.CartItemRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.CartRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.ProductRepository;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CartQueryServiceImpl implements CartQueryService {

  private final CartRepository cartRepository;
  private final CartItemRepository cartItemRepository;

  @Override
  public CartDTO findCartByUserId(Long userId) {
    var cart = cartRepository.findByUserId(userId);

    if (Objects.isNull(cart)) {
      throw new ApiRequestException("Cart not found", HttpStatus.NOT_FOUND);
    }

    var cartItems = cartItemRepository
      .findByCartId(cart.getId())
      .stream()
      .map(CartItemDTO::fromCartItem)
      .toList();

    var dto = CartDTO.fromCart(cart);
    dto.setCartItems(cartItems);

    return CartDTO.fromCart(cart);
  }
}
