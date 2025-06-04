package com.ggrmtest.ppob.infrastructure.persistence.exception;

import com.ggrmtest.ppob.common.dto.GeneralResponseDTO;
import com.ggrmtest.ppob.common.enumeration.StatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler {

  @ExceptionHandler(ApiRequestException.class)
  public ResponseEntity<GeneralResponseDTO<String>> handleApiRequestException(
    ApiRequestException exception
  ) {
    // Create a new GeneralResponseDTO with the error message as data
    GeneralResponseDTO<String> responseDTO = new GeneralResponseDTO<>();

    // Use the error method from GeneralResponseDTO to format the response
    return responseDTO.error(
      StatusCode.INTERNAL_SERVER_ERROR.getCode(),
      "Error",
      exception.getMessage(),
      exception.getMessage(),
      exception.getStatus()
    );
  }
}
