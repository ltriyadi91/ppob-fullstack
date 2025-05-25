package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.CategoryDTO;
import com.ggrmtest.ppob.infrastructure.persistence.entity.Category;
import com.ggrmtest.ppob.infrastructure.persistence.repository.CategoryRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryQueryServiceImpl implements CategoryQueryService {

  private final CategoryRepository categoryRepository;

  @Override
  public List<CategoryDTO> getAllCategories() {
    List<Category> categories = categoryRepository.findAll();
    return categories
      .stream()
      .map(category -> CategoryDTO.fromCategory(category))
      .toList();
  }
}
