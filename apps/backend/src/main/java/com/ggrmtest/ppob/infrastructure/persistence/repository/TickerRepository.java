package com.ggrmtest.ppob.infrastructure.persistence.repository;

import com.ggrmtest.ppob.infrastructure.persistence.entity.Ticker;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TickerRepository extends JpaRepository<Ticker, Long> {
  Ticker findByCategoryIdAndOperatorIdAndIsActiveTrue(Long categoryId, Long productId);
  List<Ticker> findByCategoryIdAndIsActiveTrue(Long categoryId);
}
