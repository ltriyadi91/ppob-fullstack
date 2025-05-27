package com.ggrmtest.ppob.domain.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class AddToCartDTO {

  private Long productId;
}
