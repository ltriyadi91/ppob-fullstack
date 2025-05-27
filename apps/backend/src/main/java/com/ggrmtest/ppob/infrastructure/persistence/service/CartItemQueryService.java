package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.CartItemDTO;

public interface CartItemQueryService {
  CartItemDTO findCartItemByCartIdAndProductId(Long cartId, Long productId);
}
