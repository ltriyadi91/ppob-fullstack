package com.ggrmtest.ppob.common.enumeration;

public enum TickerType {
  ERROR("Error"),
  INFO("Info"),
  WARNING("Warning");

  private String label;

  TickerType(String label) {
    this.label = label;
  }

  @Override
  public String toString() {
    return label;
  }
}
