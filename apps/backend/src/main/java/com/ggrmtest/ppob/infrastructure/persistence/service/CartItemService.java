package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.CartItemDTO;

public interface CartItemService {
  CartItemDTO saveCartItem(Long userId, Long productId);
}
