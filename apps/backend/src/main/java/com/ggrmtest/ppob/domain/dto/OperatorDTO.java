package com.ggrmtest.ppob.domain.dto;

import com.ggrmtest.ppob.infrastructure.persistence.entity.Operator;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class OperatorDTO {

  private Long operatorId;
  private String operatorName;
  private String operatorDescription;
  private Boolean isActive;
  private String slug;
  private String imageUrl;

  public static OperatorDTO fromOperator(Operator operator) {
    return new OperatorDTO()
      .setOperatorId(operator.getId())
      .setOperatorName(operator.getOperatorName())
      .setOperatorDescription(operator.getOperatorDescription())
      .setIsActive(operator.getIsActive())
      .setSlug(operator.getSlug())
      .setImageUrl(operator.getImageUrl());
  }

  public Operator toOperator(Operator operator) {
    return operator
      .setOperatorName(operatorName)
      .setImageUrl(imageUrl)
      .setOperatorDescription(operatorDescription)
      .setIsActive(isActive)
      .setSlug(slug);
  }
}
