package com.ggrmtest.ppob.common.dto;

import com.ggrmtest.ppob.common.enumeration.StatusCode;
import java.util.Date;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GeneralResponseDTO<T> {

  public static final String DEFAULT_TITLE_ERROR = "Error";

  private Date timestamp;
  private String statusCode;
  private String statusDescription;
  private String statusTitle;
  private T data;

  private void buildOk(String code, String title, String desc, T data) {
    this.data = data;
    if (code == null) statusCode = StatusCode.SUCCESS.getCode(); else statusCode = code;
    if (desc == null) statusDescription =
      StatusCode.SUCCESS.getDescription(); else statusDescription = desc;
    statusTitle = title == null ? "OK" : title;
    timestamp = new Date();
  }

  public ResponseEntity<GeneralResponseDTO<T>> ok(T data) {
    buildOk(null, null, null, data);
    return ResponseEntity.ok(this);
  }

  public ResponseEntity<GeneralResponseDTO<T>> ok(String desc, T data) {
    buildOk(null, null, desc, data);
    return ResponseEntity.ok(this);
  }

  public ResponseEntity<GeneralResponseDTO<T>> ok(String code, String desc, T data) {
    buildOk(code, null, desc, data);
    return ResponseEntity.ok(this);
  }

  public ResponseEntity<GeneralResponseDTO<T>> okWithTitle(
    String title,
    String desc,
    T data
  ) {
    buildOk(null, title, desc, data);
    return ResponseEntity.ok(this);
  }

  public ResponseEntity<GeneralResponseDTO<T>> okFull(
    String code,
    String title,
    String desc,
    T data
  ) {
    buildOk(code, title, desc, data);
    return ResponseEntity.ok(this);
  }

  private void buildError(String code, String title, String desc, T data) {
    this.data = data;
    if (code == null) statusCode = StatusCode.SUCCESS.getCode(); else statusCode = code;
    if (desc == null) statusDescription =
      StatusCode.SUCCESS.getDescription(); else statusDescription = desc;
    statusTitle = title == null ? DEFAULT_TITLE_ERROR : title;
    timestamp = new Date();
  }

  public ResponseEntity<GeneralResponseDTO<T>> error(String code, String desc, T data) {
    buildError(code, null, desc, data);
    return new ResponseEntity<>(this, HttpStatus.BAD_REQUEST);
  }

  public ResponseEntity<GeneralResponseDTO<T>> error(
    String code,
    String title,
    String desc,
    T data
  ) {
    buildError(code, title, desc, data);
    return new ResponseEntity<>(this, HttpStatus.BAD_REQUEST);
  }

  public ResponseEntity<GeneralResponseDTO<T>> error(
    String code,
    String desc,
    T data,
    HttpStatus status
  ) {
    buildError(code, null, desc, data);
    return new ResponseEntity<>(this, status);
  }

  public ResponseEntity<GeneralResponseDTO<T>> error(
    String code,
    String title,
    String desc,
    T data,
    HttpStatus status
  ) {
    buildError(code, title, desc, data);
    return new ResponseEntity<>(this, status);
  }
}
