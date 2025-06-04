package com.ggrmtest.ppob.infrastructure.persistence.entity;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Entity
@Data
@Table(name = "products")
@Accessors(chain = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Product implements Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @EqualsAndHashCode.Include
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  private Operator operator;

  @ManyToOne(fetch = FetchType.LAZY)
  private Category category;

  private String productName;
  private String productDescription;
  private BigDecimal priceNumeric;
  private String priceLabel;
  private BigDecimal newPriceNumeric;
  private String newPriceLabel;
  private Double discountPercentage;
  private Boolean isDiscount;
  private Boolean isAvailable;

  @Embedded
  @EqualsAndHashCode.Include
  @JsonUnwrapped
  private AuditInfo auditInfo = new AuditInfo();
}
