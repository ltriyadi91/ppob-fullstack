package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.OrderDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderQueryService {
  OrderDTO findOrderByUserId(Long userId);
  Page<OrderDTO> findAllPaginatedOrders(String searchTerm, Pageable pageable);
}
