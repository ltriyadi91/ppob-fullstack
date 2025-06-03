package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.OperatorDTO;
import com.ggrmtest.ppob.infrastructure.persistence.entity.Operator;
import com.ggrmtest.ppob.infrastructure.persistence.exception.ApiRequestException;
import com.ggrmtest.ppob.infrastructure.persistence.repository.OperatorRepository;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OperatorServiceImpl implements OperatorService {

  private final OperatorRepository operatorRepository;

  @Override
  public OperatorDTO saveOperator(OperatorDTO operatorDTO) {
    var operator = new Operator();
    if (Objects.nonNull(operatorDTO.getOperatorId())) {
      operator =
        operatorRepository
          .findById(operatorDTO.getOperatorId())
          .orElseThrow(() ->
            new ApiRequestException("Operator not found", HttpStatus.NOT_FOUND)
          );
    }

    var savedOperator = operatorRepository.save(operatorDTO.toOperator(operator));
    return operatorDTO.setOperatorId(savedOperator.getId());
  }
}
