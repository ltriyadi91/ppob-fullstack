package com.ggrmtest.ppob.domain.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class DirectOrderDTO {

  private Long productId;
  private String inputNumber;
}
