package com.ggrmtest.ppob.common.enumeration;

import java.util.Objects;

public enum StatusCode {
  SUCCESS("00", "Success"),
  CREATED("01", "Created"),
  SUSPECT("02", "Suspect"),
  ROLE_NOT_AVAILABLE("10", "Role not found"),
  EMAIL_NOT_AVAILABLE("11", "Email already in use"),
  WRONG_CREDENTIAL("12", "Wrong username or password"),
  BAD_REQUEST("13", "Bad credential"),
  USER_NOT_ACTIVE(
    "14",
    "Please activate your account by verify OTP and email before login"
  ),
  ACCOUNT_LOCKED("15", "Your account is locked by admin"),
  TOKEN_NOT_FOUND("16", "The link is invalid or broken"),
  TOKEN_INVALID("17", "Broken link or already use"),
  EMAIL_NOT_FOUND("18", "Email not found, Register for create new account"),
  USER_ALREADY_VERIFIED("19", "Your account is verified"),
  ROLE_EXISTS("20", "Rolename already exist"),
  TOKEN_EXPIRED("21", "Token expired"),
  DIFFERENT_DEVICE("22", "Cannot login using different device"),
  INTERNAL_SERVER_ERROR("23", "Internal server error"),
  JWT_FAILED("24", "JWT authentication failed"),
  USER_NOT_FOUND("25", "User not found"),
  EMAIL_FOUND("27", "User is already have an email"),
  USER_NOT_AVAILABLE("26", "User already in use"),
  OTP_NOT_MATCH("28", "OTP not match"),
  TEXT_NOT_FOUND("29", "Text not found"),
  ERROR_SENT_NOTIF("30", "Error sent notification by token"),
  NOT_FOUND("31", "Data not found"),
  DUPLICATE("32", "Data duplicate"),
  ID_NULL("33", "Id is null"),
  VALIDATION_FAILED("61", "Validation Failed"),
  EMPTY_USERNAME("62", "username is empty"),
  EMPTY_CUSTOMER("63", "Response customer empty"),
  DIFFERENT_AMOUNT("64", "Different amount"),
  CONNECTION_TIME_OUT("70", "Connection timeout"),
  THIRD_PARTY_ERROR_RESPONSE("71", "Error response from third party"),
  UNKNOWN_THIRD_PARTY_ERROR_RESPONSE("72", "Unknown error response from third party"),
  UNEXPECTED_THIRD_PARTY_RESPONSE("73", "Unexpected third party response"),
  UNEXPECTED_RESPONSE_OBJECT_TYPE("74", "Unexpected response object type"),
  CONTAIN_EMOJI("DV-01", "Data cannot contain Emoji"),
  FAILED_CREATING_SIGNATURE("91", "Failed when creating signature"),
  MAINTENANCE_MODE("53", "service under maintenance");

  private final String code;
  private final String description;

  private StatusCode(String code, String description) {
    this.code = code;
    this.description = description;
  }

  public String getCode() {
    return code;
  }

  public String getDescription() {
    return description;
  }

  public String findDescByCode(String code) {
    return StatusCode.valueOf(code).getDescription();
  }

  public static String getDescByCode(String code) {
    for (var response : StatusCode.values()) {
      if (Objects.equals(response.code, code)) {
        return response.getDescription();
      }
    }

    throw new IllegalArgumentException("Unsupported Status code: " + code);
  }
}
