package com.ggrmtest.ppob.infrastructure.persistence.entity;

import com.fasterxml.jackson.annotation.JsonUnwrapped;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.Accessors;

@Entity
@Data
@Table(name = "categories")
@Accessors(chain = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Category implements Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @EqualsAndHashCode.Include
  private Long id;

  @NotNull(message = "Category Name cannot be NULL")
  private String categoryName;

  private String categoryDescription;

  @NotNull(message = "Category Image cannot be NULL")
  private String imageUrl;

  @NotNull(message = "Slug cannot be NULL")
  private String slug;

  @Embedded
  @EqualsAndHashCode.Include
  @JsonUnwrapped
  private AuditInfo auditInfo = new AuditInfo();

  private Boolean isActive;
  private Boolean isInputNumberRequired;
  private Boolean isPrefixNumberRequired;
}
