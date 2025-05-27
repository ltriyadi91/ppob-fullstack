package com.ggrmtest.ppob.infrastructure.persistence.repository;

import com.ggrmtest.ppob.infrastructure.persistence.entity.CartItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
  List<CartItem> findByCartId(Long cartId);
  CartItem findByCartIdAndProductId(Long cartId, Long productId);
}
