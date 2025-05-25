package com.ggrmtest.ppob.domain.controller;

import com.ggrmtest.ppob.domain.dto.CategoryDTO;
import com.ggrmtest.ppob.infrastructure.persistence.service.CategoryQueryService;
import com.ggrmtest.ppob.infrastructure.persistence.service.CategoryService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(value = "/api/v1/categories")
@RestController
@RequiredArgsConstructor
public class CategoryController {

  private final CategoryQueryService categoryQueryService;
  private final CategoryService categoryService;

  @GetMapping
  public ResponseEntity<List<CategoryDTO>> getAllCategories() {
    List<CategoryDTO> categories = categoryQueryService.getAllCategories();
    return ResponseEntity.status(HttpStatus.OK).body(categories);
  }

	@PreAuthorize("hasAuthority('ADMIN')")
  @PostMapping
  public ResponseEntity<CategoryDTO> saveCategory(CategoryDTO categoryDTO) {
    CategoryDTO category = categoryService.saveCategory(categoryDTO);
    return ResponseEntity.status(HttpStatus.OK).body(category);
  }
}
