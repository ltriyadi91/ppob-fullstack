package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.ProductDTO;

public interface ProductService {
  ProductDTO saveProduct(ProductDTO productDTO);
  void deleteProduct(Long id);
}
