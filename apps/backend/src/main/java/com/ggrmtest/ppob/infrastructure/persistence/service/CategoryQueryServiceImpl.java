package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.CategoryDTO;
import com.ggrmtest.ppob.infrastructure.persistence.entity.Category;
import com.ggrmtest.ppob.infrastructure.persistence.exception.ApiRequestException;
import com.ggrmtest.ppob.infrastructure.persistence.repository.CategoryRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

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

  @Override
  public CategoryDTO findCategoryBySlug(String slug) {
    var category = categoryRepository.findBySlug(slug);
    if (category == null) {
      throw new ApiRequestException("Category not found", HttpStatus.NOT_FOUND);
    }
    return CategoryDTO.fromCategory(category.get());
  }

  @Override
  public CategoryDTO findCategoryById(Long id) {
    var category = categoryRepository
      .findById(id)
      .orElseThrow(() ->
        new ApiRequestException("Category not found", HttpStatus.NOT_FOUND)
      );
    return CategoryDTO.fromCategory(category);
  }

  @Override
  public Page<CategoryDTO> findAllPaginatedCategories(
    String searchTerm,
    Pageable pageable
  ) {
    // Get all categories first
    List<Category> allCategories = categoryRepository.findAll();

    // Filter by search term if provided
    List<Category> filteredCategories;
    if (StringUtils.hasText(searchTerm)) {
      String searchTermLower = searchTerm.toLowerCase();
      filteredCategories =
        allCategories
          .stream()
          .filter(category ->
            category.getCategoryName().toLowerCase().contains(searchTermLower) ||
            (
              category.getSlug() != null &&
              category.getSlug().toLowerCase().contains(searchTermLower)
            )
          )
          .collect(Collectors.toList());
    } else {
      filteredCategories = allCategories;
    }

    // Apply pagination manually
    int start = (int) pageable.getOffset();
    int end = Math.min((start + pageable.getPageSize()), filteredCategories.size());

    // Create a sublist based on pagination parameters
    List<Category> pageContent = start < end
      ? filteredCategories.subList(start, end)
      : List.of();

    // Convert to DTOs
    List<CategoryDTO> categoryDTOs = pageContent
      .stream()
      .map(CategoryDTO::fromCategory)
      .collect(Collectors.toList());

    // Create and return a Page object
    return new PageImpl<>(categoryDTOs, pageable, filteredCategories.size());
  }
}
