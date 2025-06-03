package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.ProductDTO;
import com.ggrmtest.ppob.infrastructure.persistence.entity.Product;
import com.ggrmtest.ppob.infrastructure.persistence.exception.ApiRequestException;
import com.ggrmtest.ppob.infrastructure.persistence.repository.ProductRepository;
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
public class ProductQueryServiceImpl implements ProductQueryService {

  private final ProductRepository productRepository;

  @Override
  public Page<ProductDTO> findAllPaginatedProducts(
    String searchTerm,
    Long categoryId,
    Long operatorId,
    Pageable pageable
  ) {
    // Get all products first
    List<Product> allProducts = productRepository.findAllByOrderByCategoryIdAscOperatorIdAsc();

    // Apply filters
    List<Product> filteredProducts = allProducts;

    // Filter by search term if provided
    if (StringUtils.hasText(searchTerm)) {
      String searchTermLower = searchTerm.toLowerCase();
      filteredProducts =
        filteredProducts
          .stream()
          .filter(product ->
            product.getProductName().toLowerCase().contains(searchTermLower)
          )
          .collect(Collectors.toList());
    }

    // Filter by category if provided
    if (categoryId != null) {
      filteredProducts =
        filteredProducts
          .stream()
          .filter(product -> product.getCategory().getId().equals(categoryId))
          .collect(Collectors.toList());
    }

    // Filter by operator if provided
    if (operatorId != null) {
      filteredProducts =
        filteredProducts
          .stream()
          .filter(product -> product.getOperator().getId().equals(operatorId))
          .collect(Collectors.toList());
    }

    // Apply pagination manually
    int start = (int) pageable.getOffset();
    int end = Math.min((start + pageable.getPageSize()), filteredProducts.size());

    // Create a sublist based on pagination parameters
    List<Product> pageContent = start < end
      ? filteredProducts.subList(start, end)
      : List.of();

    // Convert to DTOs
    List<ProductDTO> productDTOs = pageContent
      .stream()
      .map(ProductDTO::fromEntity)
      .collect(Collectors.toList());

    // Create and return a Page object
    return new PageImpl<>(productDTOs, pageable, filteredProducts.size());
  }

  @Override
  public ProductDTO findProductById(Long id) {
    var product = productRepository
      .findById(id)
      .orElseThrow(() ->
        new ApiRequestException("Product not found", HttpStatus.NOT_FOUND)
      );
    return ProductDTO.fromEntity(product);
  }
}
