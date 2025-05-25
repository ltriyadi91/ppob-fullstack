package com.ggrmtest.ppob.common.enumeration;

public enum Role {
  ADMIN("Admin"),
  USER("User");

  private String label;

  Role(String label) {
    this.label = label;
  }

  @Override
  public String toString() {
    return label;
  }
}
