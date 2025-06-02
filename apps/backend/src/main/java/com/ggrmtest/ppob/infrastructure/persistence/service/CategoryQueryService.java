package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.CategoryDTO;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryQueryService {
  List<CategoryDTO> getAllCategories();
  Page<CategoryDTO> findAllPaginatedCategories(String searchTerm, Pageable pageable);
  CategoryDTO findCategoryBySlug(String slug);
  CategoryDTO findCategoryById(Long id);
}
