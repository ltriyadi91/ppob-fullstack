package com.ggrmtest.ppob.common.enumeration;

public enum OrderStatus {
  PENDING("Pending"),
  PAID("Paid"),
  CANCELLED("Cancelled");

  private String label;

  OrderStatus(String label) {
    this.label = label;
  }

  @Override
  public String toString() {
    return label;
  }
}
