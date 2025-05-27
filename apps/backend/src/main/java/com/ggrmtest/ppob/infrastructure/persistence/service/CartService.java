package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.CartDTO;

public interface CartService {
  CartDTO saveCartByUserId(Long userId);
}
