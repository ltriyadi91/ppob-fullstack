package com.ggrmtest.ppob.domain.controller;

import com.ggrmtest.ppob.common.dto.GeneralResponseDTO;
import com.ggrmtest.ppob.domain.dto.OperatorDTO;
import com.ggrmtest.ppob.infrastructure.persistence.service.OperatorQueryService;
import com.ggrmtest.ppob.infrastructure.persistence.service.OperatorService;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

@RequestMapping(value = "/api/v1/operators")
@RestController
@RequiredArgsConstructor
public class OperatorController {

  private final OperatorQueryService operatorQueryService;
  private final OperatorService operatorService;

  @GetMapping
  public ResponseEntity<GeneralResponseDTO<List<OperatorDTO>>> getAllOperators() {
    List<OperatorDTO> operators = operatorQueryService.getAllOperators();

    var resp = new GeneralResponseDTO<List<OperatorDTO>>();
    return resp.ok(operators);
  }

  @GetMapping("/paginated")
  public ResponseEntity<GeneralResponseDTO<Page<OperatorDTO>>> findAllPaginatedOperators(
    @RequestParam(required = false) String searchTerm,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(defaultValue = "operatorName") String sortBy,
    @RequestParam(defaultValue = "asc") String sortDir
  ) {
    Sort.Direction direction = sortDir.equalsIgnoreCase("desc")
      ? Sort.Direction.DESC
      : Sort.Direction.ASC;

    Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
    Page<OperatorDTO> operators = operatorQueryService.findAllPaginatedOperators(
      searchTerm,
      pageable
    );

    var resp = new GeneralResponseDTO<Page<OperatorDTO>>();
    return resp.ok(operators);
  }

  @GetMapping("/{id}")
  public ResponseEntity<GeneralResponseDTO<OperatorDTO>> getOperatorById(
    @PathVariable Long id
  ) {
    OperatorDTO operator = operatorQueryService.findOperatorById(id);

    var resp = new GeneralResponseDTO<OperatorDTO>();
    return resp.ok(operator);
  }

  @PreAuthorize("hasAuthority('ADMIN')")
  @PostMapping
  public ResponseEntity<GeneralResponseDTO<OperatorDTO>> saveOperator(
    @RequestBody OperatorDTO operatorDTO
  ) {
    var operatorId = operatorDTO.getOperatorId();

    OperatorDTO operator = Objects.nonNull(operatorId)
      ? operatorService.saveOperator(operatorDTO)
      : operatorService.addOperator(operatorDTO);

    var resp = new GeneralResponseDTO<OperatorDTO>();
    return resp.ok(operator);
  }
}
