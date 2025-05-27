package com.ggrmtest.ppob.infrastructure.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.Accessors;

@Entity
@Data
@Table(name = "prefix_numbers")
@Accessors(chain = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PrefixNumber {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @EqualsAndHashCode.Include
  private Long id;

  @NotNull(message = "Prefix Number cannot be NULL")
  @Column(name = "prefix_number")
  private String prefixNumber;

  @OneToOne(fetch = FetchType.LAZY)
  private Operator operator;
}
