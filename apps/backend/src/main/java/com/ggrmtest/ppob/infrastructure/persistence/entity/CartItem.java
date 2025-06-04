package com.ggrmtest.ppob.infrastructure.persistence.entity;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Entity
@Data
@Table(name = "cart_items")
@Accessors(chain = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class CartItem implements Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "product_id")
  private Product product;

  @ManyToOne
  @JoinColumn(name = "cart_id")
  private Cart cart;

  @Embedded
  @EqualsAndHashCode.Include
  @JsonUnwrapped
  private AuditInfo auditInfo = new AuditInfo();

  private BigDecimal cartPrice;
  private Integer cartQuantity;
  private String inputNumber;
}
