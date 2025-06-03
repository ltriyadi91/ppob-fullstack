package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.OperatorDTO;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OperatorQueryService {
  List<OperatorDTO> getAllOperators();
  OperatorDTO findOperatorById(Long id);
  Page<OperatorDTO> findAllPaginatedOperators(String searchTerm, Pageable pageable);
}
