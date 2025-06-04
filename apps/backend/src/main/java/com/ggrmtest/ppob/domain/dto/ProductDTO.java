package com.ggrmtest.ppob.domain.dto;

import com.ggrmtest.ppob.infrastructure.persistence.entity.Product;
import java.math.BigDecimal;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ProductDTO {

  private Long id;
  private Long operatorId;
  private Long categoryId;
  private String productName;
  private String productDescription;
  private BigDecimal priceNumeric;
  private String priceLabel;
  private BigDecimal newPriceNumeric;
  private String newPriceLabel;
  private Double discountPercentage;
  private Boolean isDiscount;
  private Boolean isAvailable;
  private String categoryName;
  private String categoryImage;
  private String operatorName;

  public static ProductDTO fromEntity(Product product) {
    return new ProductDTO()
      .setId(product.getId())
      .setCategoryId(product.getCategory().getId())
      .setOperatorId(product.getOperator().getId())
      .setProductName(product.getProductName())
      .setProductDescription(product.getProductDescription())
      .setPriceNumeric(product.getPriceNumeric())
      .setPriceLabel(product.getPriceLabel())
      .setNewPriceNumeric(product.getNewPriceNumeric())
      .setNewPriceLabel(product.getNewPriceLabel())
      .setDiscountPercentage(product.getDiscountPercentage())
      .setIsDiscount(product.getIsDiscount())
      .setIsAvailable(product.getIsAvailable())
      .setCategoryName(product.getCategory().getCategoryName())
      .setCategoryImage(product.getCategory().getImageUrl())
      .setOperatorName(product.getOperator().getOperatorName());
  }

  public Product toEntity(Product product) {
    return product
      .setId(id)
      .setProductName(productName)
      .setProductDescription(productDescription)
      .setPriceNumeric(priceNumeric)
      .setPriceLabel(priceLabel)
      .setNewPriceNumeric(newPriceNumeric)
      .setNewPriceLabel(newPriceLabel)
      .setDiscountPercentage(discountPercentage)
      .setIsDiscount(isDiscount)
      .setIsAvailable(isAvailable);
  }
}
