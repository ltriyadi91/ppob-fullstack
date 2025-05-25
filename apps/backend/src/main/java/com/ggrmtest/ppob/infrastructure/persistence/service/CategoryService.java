package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.CategoryDTO;

public interface CategoryService {
  CategoryDTO saveCategory(CategoryDTO categoryDTO);
}
