package com.ggrmtest.ppob.domain.controller;

import com.ggrmtest.ppob.domain.dto.LoginResponseDTO;
import com.ggrmtest.ppob.domain.dto.UserDetailDTO;
import com.ggrmtest.ppob.domain.dto.UserLoginDTO;
import com.ggrmtest.ppob.domain.dto.UserRegisterDTO;
import com.ggrmtest.ppob.infrastructure.persistence.JwtService;
import com.ggrmtest.ppob.infrastructure.persistence.entity.User;
import com.ggrmtest.ppob.infrastructure.persistence.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/auth")
@RestController
public class AuthenticationController {

  @Autowired
  private JwtService jwtService;

  @Autowired
  private AuthenticationService authenticationService;

  @PostMapping("/customer/signup")
  public ResponseEntity<UserRegisterDTO> registerCustomer(
    @RequestBody UserRegisterDTO userDto
  ) {
    UserRegisterDTO registeredUser = authenticationService.customerSignup(userDto);
    return ResponseEntity.ok(registeredUser);
  }

  @PostMapping("/admin/signup")
  public ResponseEntity<UserRegisterDTO> registerSeller(
    @RequestBody UserRegisterDTO userDto
  ) {
    UserRegisterDTO registeredUser = authenticationService.sellerSignup(userDto);
    return ResponseEntity.ok(registeredUser);
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponseDTO> authenticate(
    @RequestBody UserLoginDTO customerDto
  ) {
    User authenticatedUser = authenticationService.userAuthenticate(customerDto);
    String jwtToken = jwtService.generateToken(authenticatedUser);
    LoginResponseDTO loginResponse = new LoginResponseDTO()
      .setToken(jwtToken)
      .setExpiresIn(jwtService.getExpirationTime());
    return ResponseEntity.ok(loginResponse);
  }

  @GetMapping("/validate")
  public ResponseEntity<UserDetailDTO> validateToken() {
    Authentication authentication = SecurityContextHolder
      .getContext()
      .getAuthentication();
    String username = authentication.getName();
    var user = authenticationService.findByUserName(username);
    return ResponseEntity.ok(UserDetailDTO.fromUser(user));
  }
}
