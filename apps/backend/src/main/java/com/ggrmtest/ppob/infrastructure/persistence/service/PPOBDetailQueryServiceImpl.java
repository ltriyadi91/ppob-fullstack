package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.OperatorDTO;
import com.ggrmtest.ppob.domain.dto.PPOBDetailDTO;
import com.ggrmtest.ppob.domain.dto.ProductDTO;
import com.ggrmtest.ppob.domain.dto.TickerDTO;
import com.ggrmtest.ppob.infrastructure.persistence.entity.Product;
import com.ggrmtest.ppob.infrastructure.persistence.repository.PrefixNumberRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.ProductRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.TickerRepository;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PPOBDetailQueryServiceImpl implements PPOBDetailQueryService {

  private final CategoryQueryService categoryQueryService;

  private final TickerRepository tickerRepository;
  private final ProductRepository productRepository;
  private final PrefixNumberRepository prefixNumberRepository;

  @Override
  public PPOBDetailDTO findProductsByCategorySlug(
    String categorySlug,
    String inputParam
  ) {
    var categoryDto = categoryQueryService.findCategoryBySlug(categorySlug);

    var tickers = tickerRepository.findByCategoryIdAndIsActiveTrue(
      categoryDto.getCategoryId()
    );

    List<Product> products = new ArrayList<>();

    if (!inputParam.isEmpty()) {
      var prefixNumber = prefixNumberRepository
      .findAll()
      .stream()
      .filter(p -> p.getPrefixNumber().contains(inputParam))
      .findFirst();

      products = productRepository.findByCategoryGroupByOperator(
        categoryDto.getCategoryId()
      );

      products =
        products
            .stream()
            .filter(product ->
              product.getOperator().getId().toString().contains(prefixNumber.get().getOperator().getId().toString())
            )
            .toList();
    }

    var productDtos = products.stream().map(ProductDTO::fromEntity).toList();

    var operatorDtos = products
      .stream()
      .map(product -> OperatorDTO.fromOperator(product.getOperator()))
      .collect(Collectors.toCollection(LinkedHashSet::new))
      .stream()
      .toList();

    var tickerDtos = tickers
      .stream()
      .map(ticker -> TickerDTO.fromTicker(ticker))
      .toList();

    var detailDto = new PPOBDetailDTO();
    detailDto.setProducts(productDtos);
    detailDto.setOperators(operatorDtos);
    detailDto.setTickers(tickerDtos);
    detailDto.setCategory(categoryDto);

    return detailDto;
  }
}
