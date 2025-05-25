package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.CategoryDTO;
import com.ggrmtest.ppob.infrastructure.persistence.entity.Category;
import com.ggrmtest.ppob.infrastructure.persistence.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

  private final CategoryRepository categoryRepository;

  @Override
  public CategoryDTO addCategory(CategoryDTO categoryDTO) {
    var category = categoryRepository.findByCategoryName(categoryDTO.getCategoryName());

    if (category.isPresent()) {
      throw new RuntimeException("Category already exists");
    }

    categoryRepository.save(categoryDTO.toCategory(new Category()));
    return categoryDTO;
  }

  @Override
  public CategoryDTO saveCategory(CategoryDTO categoryDTO) {
    var category = categoryRepository
      .findByCategoryName(categoryDTO.getCategoryName())
      .orElseGet(() -> new Category());
    categoryRepository.save(categoryDTO.toCategory(category));
    return categoryDTO;
  }
}
