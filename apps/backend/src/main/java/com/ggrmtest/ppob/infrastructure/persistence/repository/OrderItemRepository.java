package com.ggrmtest.ppob.infrastructure.persistence.repository;

import com.ggrmtest.ppob.infrastructure.persistence.entity.OrderItem;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
  List<OrderItem> findByOrderId(UUID orderId);
}
