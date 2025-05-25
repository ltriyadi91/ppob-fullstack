package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.CategoryDTO;
import com.ggrmtest.ppob.infrastructure.persistence.entity.Category;
import com.ggrmtest.ppob.infrastructure.persistence.repository.CategoryRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

  private final CategoryRepository categoryRepository;

  @Override
  public CategoryDTO saveCategory(CategoryDTO categoryDTO) {
    var category = categoryRepository
      .findByCategoryName(categoryDTO.getCategoryName())
      .orElseGet(() -> new Category());
    categoryRepository.save(categoryDTO.toCategory(category));
    return categoryDTO;
  }
}
