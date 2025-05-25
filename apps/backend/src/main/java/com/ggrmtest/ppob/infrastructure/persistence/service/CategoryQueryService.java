package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.CategoryDTO;
import java.util.List;

public interface CategoryQueryService {
  List<CategoryDTO> getAllCategories();
}
