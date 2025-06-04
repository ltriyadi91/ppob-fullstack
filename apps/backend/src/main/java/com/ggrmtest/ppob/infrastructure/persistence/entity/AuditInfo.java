package com.ggrmtest.ppob.infrastructure.persistence.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import java.time.Instant;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

@jakarta.persistence.Embeddable
@Data
public class AuditInfo {

  @CreatedDate
  @jakarta.persistence.Column(updatable = false)
  @JsonFormat(shape = Shape.STRING)
  private Instant createdAt = Instant.now();

  @CreatedBy
  private String createdBy;

  @LastModifiedDate
  @JsonFormat(shape = Shape.STRING)
  private Instant updatedAt = Instant.now();

  @LastModifiedBy
  private String updatedBy;
}