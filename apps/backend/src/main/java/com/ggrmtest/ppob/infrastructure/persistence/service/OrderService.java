package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.OrderDTO;

public interface OrderService {
  OrderDTO placeOrder(Long userId);
}
