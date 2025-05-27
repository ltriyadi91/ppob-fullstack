package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.OrderDTO;

public interface OrderQueryService {
  OrderDTO findOrderByUserId(Long userId);
}
