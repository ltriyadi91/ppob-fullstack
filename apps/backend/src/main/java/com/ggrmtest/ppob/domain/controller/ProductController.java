package com.ggrmtest.ppob.domain.controller;

import com.ggrmtest.ppob.common.dto.GeneralResponseDTO;
import com.ggrmtest.ppob.domain.dto.ProductDTO;
import com.ggrmtest.ppob.infrastructure.persistence.service.ProductQueryService;
import com.ggrmtest.ppob.infrastructure.persistence.service.ProductService;
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

@RequestMapping(value = "/api/v1/products")
@RestController
@RequiredArgsConstructor
public class ProductController {

  private final ProductQueryService productQueryService;
  private final ProductService productService;

  @GetMapping("/paginated")
  public ResponseEntity<GeneralResponseDTO<Page<ProductDTO>>> searchProducts(
    @RequestParam(required = false) String searchTerm,
    @RequestParam(required = false) Long categoryId,
    @RequestParam(required = false) Long operatorId,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(defaultValue = "productName") String sortBy,
    @RequestParam(defaultValue = "asc") String sortDir
  ) {
    Sort.Direction direction = sortDir.equalsIgnoreCase("desc")
      ? Sort.Direction.DESC
      : Sort.Direction.ASC;
    PageRequest pageRequest = PageRequest.of(page, size, Sort.by(direction, sortBy));

    Page<ProductDTO> products = productQueryService.findAllPaginatedProducts(
      searchTerm,
      categoryId,
      operatorId,
      pageRequest
    );
    var resp = new GeneralResponseDTO<Page<ProductDTO>>();
    return resp.ok(products);
  }

  @GetMapping("/{id}")
  public ResponseEntity<GeneralResponseDTO<ProductDTO>> getProductById(
    @PathVariable Long id
  ) {
    ProductDTO product = productQueryService.findProductById(id);

    var resp = new GeneralResponseDTO<ProductDTO>();
    return resp.ok(product);
  }

  @PreAuthorize("hasAuthority('ADMIN')")
  @PostMapping
  public ResponseEntity<GeneralResponseDTO<ProductDTO>> saveProduct(
    @RequestBody ProductDTO productDTO
  ) {
    ProductDTO product = productService.saveProduct(productDTO);

    var resp = new GeneralResponseDTO<ProductDTO>();
    return resp.ok(product);
  }
}
