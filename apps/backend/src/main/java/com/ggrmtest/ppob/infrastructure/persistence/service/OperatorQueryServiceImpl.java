package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.OperatorDTO;
import com.ggrmtest.ppob.infrastructure.persistence.entity.Operator;
import com.ggrmtest.ppob.infrastructure.persistence.repository.OperatorRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
