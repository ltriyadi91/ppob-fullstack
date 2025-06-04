package com.ggrmtest.ppob.domain.dto;

import com.ggrmtest.ppob.infrastructure.persistence.entity.Ticker;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class TickerDTO {

  private Long tickerId;
  private String message;
  private CategoryDTO category;
  private OperatorDTO operator;

  public static TickerDTO fromTicker(Ticker ticker) {
    return new TickerDTO()
      .setTickerId(ticker.getId())
      .setMessage(ticker.getDescription())
      .setCategory(CategoryDTO.fromCategory(ticker.getCategory()))
      .setOperator(OperatorDTO.fromOperator(ticker.getOperator()));
  }

  public Ticker toTicker(Ticker ticker) {
    return ticker.setId(tickerId).setDescription(message);
  }
}
