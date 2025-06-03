package com.ggrmtest.ppob.domain.dto;

import com.ggrmtest.ppob.infrastructure.persistence.entity.Category;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class CategoryDTO {

  private Long categoryId;
  private String categoryName;
  private String categoryDescription;
  private Boolean isActive;
  private Boolean isInputNumberRequired;
  private String slug;
  private String imageUrl;

  public static CategoryDTO fromCategory(Category category) {
    return new CategoryDTO()
      .setIsActive(category.getIsActive())
      .setIsInputNumberRequired(category.getIsInputNumberRequired())
      .setCategoryDescription(category.getCategoryDescription())
      .setSlug(category.getSlug())
      .setCategoryId(category.getId())
      .setCategoryName(category.getCategoryName())
      .setImageUrl(category.getImageUrl());
  }

  public Category toCategory(Category category) {
    return category
      .setId(categoryId)
      .setIsActive(isActive)
      .setIsInputNumberRequired(isInputNumberRequired)
      .setCategoryDescription(categoryDescription)
      .setCategoryName(categoryName)
      .setImageUrl(imageUrl)
      .setSlug(slug);
  }
}
