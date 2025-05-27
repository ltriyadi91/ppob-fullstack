package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.CartItemDTO;
import com.ggrmtest.ppob.infrastructure.persistence.exception.ApiRequestException;
import com.ggrmtest.ppob.infrastructure.persistence.repository.CartItemRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CartItemQueryServiceImpl implements CartItemQueryService {

  private final CartItemRepository cartItemRepository;
  private final ProductRepository productRepository;

  @Override
  public CartItemDTO findCartItemByCartIdAndProductId(Long cartId, Long productId) {
    productRepository
      .findById(productId)
      .orElseThrow(() ->
        new ApiRequestException("Product not found", HttpStatus.NOT_FOUND)
      );

    var cartItem = cartItemRepository.findByCartIdAndProductId(cartId, productId);

    return CartItemDTO.fromCartItem(cartItem);
  }
}
