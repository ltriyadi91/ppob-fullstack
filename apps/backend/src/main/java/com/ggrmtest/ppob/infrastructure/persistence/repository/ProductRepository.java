package com.ggrmtest.ppob.infrastructure.persistence.repository;

import com.ggrmtest.ppob.infrastructure.persistence.entity.Product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {
  List<Product> findByCategoryIdAndOperatorId(Long categoryId, Long operatorId);

  @Query(
    "SELECT p FROM Product p WHERE p.category.id = :categoryId ORDER BY p.operator.id ASC"
  )
  List<Product> findByCategoryGroupByOperator(@Param("categoryId") Long categoryId);
}
