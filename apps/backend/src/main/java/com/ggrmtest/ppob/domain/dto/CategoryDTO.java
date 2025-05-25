package com.ggrmtest.ppob.domain.dto;

import com.ggrmtest.ppob.infrastructure.persistence.entity.Category;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class CategoryDTO {

  private Long categoryId;
  private String categoryName;
  private String imageUrl;

  public static CategoryDTO fromCategory(Category category) {
    return new CategoryDTO()
      .setCategoryId(category.getId())
      .setCategoryName(category.getCategoryName())
      .setImageUrl(category.getImageUrl());
  }

  public Category toCategory(Category category) {
    return category.setCategoryName(categoryName).setImageUrl(imageUrl);
  }
}
