package com.ggrmtest.ppob.infrastructure.persistence.repository;

import com.ggrmtest.ppob.infrastructure.persistence.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
  Cart findByUserId(Long userId);
}
