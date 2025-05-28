package com.ggrmtest.ppob.domain.dto;

import java.util.List;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class PPOBDetailDTO {

  private CategoryDTO category;
  private List<TickerDTO> tickers;
  private List<OperatorDTO> operators;
  private List<ProductDTO> products;
}
