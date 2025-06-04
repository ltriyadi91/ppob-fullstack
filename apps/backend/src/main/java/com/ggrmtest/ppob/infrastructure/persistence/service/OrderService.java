package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.DirectOrderDTO;
import com.ggrmtest.ppob.domain.dto.OrderDTO;

public interface OrderService {
  OrderDTO placeOrderFromCart(Long userId);
  OrderDTO placeDirectOrder(Long userId, DirectOrderDTO directOrderDTO);
}
