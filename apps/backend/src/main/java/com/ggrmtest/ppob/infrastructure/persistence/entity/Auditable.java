package com.ggrmtest.ppob.infrastructure.persistence.entity;

public interface Auditable {
  /**
   * Retrieves the unique identifier (ID) of the entity.
   *
   * @return The ID of the entity.
   */
  Long getId();

  /**
   * Retrieves the audit information associated with the entity.
   *
   * @return An {@code AuditInfo} object containing details such as creation timestamp, creator,
   *         last update timestamp, and last updater.
   */
  AuditInfo getAuditInfo();
}
