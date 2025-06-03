package com.ggrmtest.ppob.domain.controller;

import com.ggrmtest.ppob.common.dto.GeneralResponseDTO;
import com.ggrmtest.ppob.domain.dto.CategoryDTO;
import com.ggrmtest.ppob.infrastructure.persistence.service.CategoryQueryService;
import com.ggrmtest.ppob.infrastructure.persistence.service.CategoryService;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(value = "/api/v1")
@RestController
@RequiredArgsConstructor
public class CategoryController {

  private final CategoryQueryService categoryQueryService;
  private final CategoryService categoryService;

  @GetMapping("/categories/paginated")
  public ResponseEntity<GeneralResponseDTO<Page<CategoryDTO>>> searchCategories(
    @RequestParam(required = false) String searchTerm,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(defaultValue = "categoryName") String sortBy,
    @RequestParam(defaultValue = "asc") String sortDir
  ) {
    Sort.Direction direction = sortDir.equalsIgnoreCase("desc")
      ? Sort.Direction.DESC
      : Sort.Direction.ASC;
    PageRequest pageRequest = PageRequest.of(page, size, Sort.by(direction, sortBy));

    Page<CategoryDTO> categories = categoryQueryService.findAllPaginatedCategories(
      searchTerm,
      pageRequest
    );

    var resp = new GeneralResponseDTO<Page<CategoryDTO>>();
    return resp.ok(categories);
  }

  @GetMapping("/categories")
  public ResponseEntity<GeneralResponseDTO<List<CategoryDTO>>> searchCategories() {
    List<CategoryDTO> categories = categoryQueryService.getAllCategories();

    var resp = new GeneralResponseDTO<List<CategoryDTO>>();
    return resp.ok(categories);
  }

  @GetMapping("/categories/{id}")
  public ResponseEntity<GeneralResponseDTO<CategoryDTO>> getCategoryById(
    @PathVariable Long id
  ) {
    CategoryDTO category = categoryQueryService.findCategoryById(id);

    var resp = new GeneralResponseDTO<CategoryDTO>();
    return resp.ok(category);
  }

  @PreAuthorize("hasAuthority('ADMIN')")
  @PostMapping("/categories")
  public ResponseEntity<GeneralResponseDTO<CategoryDTO>> saveCategory(
    @RequestBody CategoryDTO categoryDTO
  ) {
    var categoryId = categoryDTO.getCategoryId();

    CategoryDTO category = Objects.nonNull(categoryId)
      ? categoryService.saveCategory(categoryDTO)
      : categoryService.addCategory(categoryDTO);

    var resp = new GeneralResponseDTO<CategoryDTO>();
    return resp.ok(category);
  }
}
