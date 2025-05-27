package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.CartDTO;

public interface CartQueryService {
  CartDTO findCartByUserId(Long userId);
}
