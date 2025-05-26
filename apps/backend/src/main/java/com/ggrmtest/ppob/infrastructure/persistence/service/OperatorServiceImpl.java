package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.OperatorDTO;
import com.ggrmtest.ppob.infrastructure.persistence.entity.Operator;
import com.ggrmtest.ppob.infrastructure.persistence.exception.ApiRequestException;
import com.ggrmtest.ppob.infrastructure.persistence.repository.OperatorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OperatorServiceImpl implements OperatorService {

  private final OperatorRepository operatorRepository;

  @Override
  public OperatorDTO addOperator(OperatorDTO operatorDTO) {
    var operator = operatorRepository.findByOperatorName(operatorDTO.getOperatorName());

    if (operator.isPresent()) {
      throw new ApiRequestException("Operator already exists", HttpStatus.NOT_ACCEPTABLE);
    }

    operatorRepository.save(operatorDTO.toOperator(new Operator()));
    return operatorDTO;
  }

  @Override
  public OperatorDTO saveOperator(OperatorDTO operatorDTO) {
    var operator = operatorRepository.findById(operatorDTO.getOperatorId());

    if (operator.isEmpty()) {
      throw new ApiRequestException("Operator not found", HttpStatus.NOT_FOUND);
    }

    operatorRepository.save(operatorDTO.toOperator(operator.get()));
    return operatorDTO;
  }
}
