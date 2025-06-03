package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.ProductDTO;
import com.ggrmtest.ppob.infrastructure.persistence.entity.Product;
import com.ggrmtest.ppob.infrastructure.persistence.exception.ApiRequestException;
import com.ggrmtest.ppob.infrastructure.persistence.repository.ProductRepository;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

  private final ProductRepository productRepository;

  @Override
  public ProductDTO saveProduct(ProductDTO productDTO) {
    var product = new Product();
    if (Objects.nonNull(productDTO.getId())) {
      product =
        productRepository
          .findById(productDTO.getId())
          .orElseThrow(() ->
            new ApiRequestException("Product not found", HttpStatus.NOT_FOUND)
          );
    }

    productRepository.save(productDTO.toEntity(product));
    return productDTO;
  }
}
