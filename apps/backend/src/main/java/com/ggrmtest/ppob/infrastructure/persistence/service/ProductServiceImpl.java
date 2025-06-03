package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.ProductDTO;
import com.ggrmtest.ppob.infrastructure.persistence.entity.Product;
import com.ggrmtest.ppob.infrastructure.persistence.exception.ApiRequestException;
import com.ggrmtest.ppob.infrastructure.persistence.repository.CategoryRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.OperatorRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.ProductRepository;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

  private final ProductRepository productRepository;
  private final CategoryRepository categoryRepository;
  private final OperatorRepository operatorRepository;

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

    var category = categoryRepository
      .findById(productDTO.getCategoryId())
      .orElseThrow(() ->
        new ApiRequestException("Category not found", HttpStatus.NOT_FOUND)
      );
    var operator = operatorRepository
      .findById(productDTO.getOperatorId())
      .orElseThrow(() ->
        new ApiRequestException("Operator not found", HttpStatus.NOT_FOUND)
      );

    product.setCategory(category);
    product.setOperator(operator);

    var savedProduct = productRepository.save(productDTO.toEntity(product));
    return productDTO.setId(savedProduct.getId());
  }
}
