package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.OperatorDTO;

public interface OperatorService {
  OperatorDTO saveOperator(OperatorDTO operatorDTO);
  void deleteOperator(Long id);
}
