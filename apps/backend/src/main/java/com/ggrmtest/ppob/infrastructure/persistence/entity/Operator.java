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
@Table(name = "operators")
@Accessors(chain = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Operator implements Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @EqualsAndHashCode.Include
  private Long id;

  @NotNull(message = "Operator Name cannot be NULL")
  private String operatorName;

  private String operatorDescription;

  @NotNull(message = "Operator Image cannot be NULL")
  private String imageUrl;

  @Embedded
  @EqualsAndHashCode.Include
  @JsonUnwrapped
  private AuditInfo auditInfo = new AuditInfo();

  private Boolean isActive;
  private String slug;
}
