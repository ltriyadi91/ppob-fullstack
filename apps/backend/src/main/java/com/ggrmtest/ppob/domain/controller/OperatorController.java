package com.ggrmtest.ppob.domain.controller;

import com.ggrmtest.ppob.domain.dto.OperatorDTO;
import com.ggrmtest.ppob.infrastructure.persistence.service.OperatorQueryService;
import com.ggrmtest.ppob.infrastructure.persistence.service.OperatorService;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(value = "/api/v1/operators")
@RestController
@RequiredArgsConstructor
public class OperatorController {

  private final OperatorQueryService operatorQueryService;
  private final OperatorService operatorService;

  @GetMapping
  public ResponseEntity<List<OperatorDTO>> getAllSubCategories() {
    List<OperatorDTO> operators = operatorQueryService.getAllOperators();
    return ResponseEntity.status(HttpStatus.OK).body(operators);
  }

  @PreAuthorize("hasAuthority('ADMIN')")
  @PostMapping
  public ResponseEntity<OperatorDTO> saveSubCategory(
    @RequestBody OperatorDTO operatorDTO
  ) {
    var operatorId = operatorDTO.getOperatorId();

    OperatorDTO operator = Objects.nonNull(operatorId)
      ? operatorService.saveOperator(operatorDTO)
      : operatorService.addOperator(operatorDTO);

    return ResponseEntity.status(HttpStatus.OK).body(operator);
  }
}
