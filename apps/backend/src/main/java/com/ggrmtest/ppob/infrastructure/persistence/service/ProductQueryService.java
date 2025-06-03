package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.ProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductQueryService {
  Page<ProductDTO> findAllPaginatedProducts(String searchTerm, Pageable pageable);
  ProductDTO findProductById(Long id);
}
