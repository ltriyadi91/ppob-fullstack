package com.ggrmtest.ppob.infrastructure.persistence.repository;

import com.ggrmtest.ppob.infrastructure.persistence.entity.Order;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
  Optional<Order> findByUserId(Long userId);
}
