package com.ggrmtest.ppob.infrastructure.persistence.entity;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.ggrmtest.ppob.common.enumeration.OrderStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.UUID;
import lombok.*;
import lombok.experimental.Accessors;

@Entity
@Data
@Table(name = "orders")
@Accessors(chain = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Order implements Auditable {

  @PrePersist
  public void prePersist() {
    if (orderId == null) {
      orderId = java.util.UUID.randomUUID();
    }
  }

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @EqualsAndHashCode.Include
  private Long id;

  @Column(
    columnDefinition = "BINARY(16)",
    unique = true,
    nullable = false,
    updatable = false
  )
  private UUID orderId;

  private BigDecimal totalAmount;

  @ManyToOne
  private User user;

  @Enumerated(EnumType.STRING)
  @Column(name = "order_status")
  private OrderStatus status;

  @Embedded
  @EqualsAndHashCode.Include
  @JsonUnwrapped
  private AuditInfo auditInfo = new AuditInfo();
}
