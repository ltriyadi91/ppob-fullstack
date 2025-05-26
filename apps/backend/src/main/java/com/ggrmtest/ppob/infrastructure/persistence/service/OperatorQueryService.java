package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.OperatorDTO;
import java.util.List;

public interface OperatorQueryService {
  List<OperatorDTO> getAllOperators();
}
