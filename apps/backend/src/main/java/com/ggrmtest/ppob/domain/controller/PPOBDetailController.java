package com.ggrmtest.ppob.domain.controller;

import com.ggrmtest.ppob.common.dto.GeneralResponseDTO;
import com.ggrmtest.ppob.domain.dto.PPOBDetailDTO;
import com.ggrmtest.ppob.infrastructure.persistence.service.PPOBDetailQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(value = "/api/v1")
@RestController
@RequiredArgsConstructor
public class PPOBDetailController {

  private final PPOBDetailQueryService ppobDetailQueryService;

  @GetMapping("/ppob-detail/{slug}")
  public ResponseEntity<GeneralResponseDTO<PPOBDetailDTO>> getPPOBDetail(
    @PathVariable String slug,
    @RequestParam(defaultValue = "") String inputNumber,
    @RequestParam(defaultValue = "") String operatorId
  ) {
    Long operatorIdLong = operatorId.isEmpty() ? null : Long.valueOf(operatorId);
    PPOBDetailDTO detail = ppobDetailQueryService.findProductsByCategorySlug(
      slug,
      inputNumber,
      operatorIdLong
    );

    var resp = new GeneralResponseDTO<PPOBDetailDTO>();
    return resp.ok(detail);
  }
}
