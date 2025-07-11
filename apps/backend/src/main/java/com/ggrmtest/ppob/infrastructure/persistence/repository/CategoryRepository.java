package com.ggrmtest.ppob.infrastructure.persistence.repository;

import com.ggrmtest.ppob.infrastructure.persistence.entity.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
  List<Category> findAllByOrderByIdAsc();
  Optional<Category> findByCategoryName(String categoryName);
  Optional<Category> findBySlug(String slug);
}
