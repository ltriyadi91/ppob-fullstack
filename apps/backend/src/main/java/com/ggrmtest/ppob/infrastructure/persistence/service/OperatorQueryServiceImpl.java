package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.OperatorDTO;
import com.ggrmtest.ppob.infrastructure.persistence.entity.Operator;
import com.ggrmtest.ppob.infrastructure.persistence.exception.ApiRequestException;
import com.ggrmtest.ppob.infrastructure.persistence.repository.OperatorRepository;
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
public class OperatorQueryServiceImpl implements OperatorQueryService {

  private final OperatorRepository operatorRepository;

  @Override
  public List<OperatorDTO> getAllOperators() {
    List<Operator> operators = operatorRepository.findAll();
    return operators
      .stream()
      .map(operator -> OperatorDTO.fromOperator(operator))
      .toList();
  }

  @Override
  public OperatorDTO findOperatorById(Long id) {
    Operator operator = operatorRepository
      .findById(id)
      .orElseThrow(() ->
        new ApiRequestException("Operator not found", HttpStatus.NOT_FOUND)
      );
    return OperatorDTO.fromOperator(operator);
  }

  @Override
  public Page<OperatorDTO> findAllPaginatedOperators(
    String searchTerm,
    Pageable pageable
  ) {
    // Get all operators first
    List<Operator> allOperators = operatorRepository.findAllByOrderByIdAsc();

    // Filter by search term if provided
    List<Operator> filteredOperators;
    if (StringUtils.hasText(searchTerm)) {
      String searchTermLower = searchTerm.toLowerCase();
      filteredOperators =
        allOperators
          .stream()
          .filter(operator ->
            operator.getOperatorName().toLowerCase().contains(searchTermLower) ||
            (
              operator.getSlug() != null &&
              operator.getSlug().toLowerCase().contains(searchTermLower)
            )
          )
          .collect(Collectors.toList());
    } else {
      filteredOperators = allOperators;
    }

    // Apply pagination manually
    int start = (int) pageable.getOffset();
    int end = Math.min((start + pageable.getPageSize()), filteredOperators.size());

    // Create a sublist based on pagination parameters
    List<Operator> pageContent = start < end
      ? filteredOperators.subList(start, end)
      : List.of();

    // Convert to DTOs
    List<OperatorDTO> operatorDTOs = pageContent
      .stream()
      .map(OperatorDTO::fromOperator)
      .collect(Collectors.toList());

    // Create and return a Page object
    return new PageImpl<>(operatorDTOs, pageable, filteredOperators.size());
  }
}
