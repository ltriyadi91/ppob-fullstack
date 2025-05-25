package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.common.enumeration.Role;
import com.ggrmtest.ppob.domain.dto.UserLoginDTO;
import com.ggrmtest.ppob.domain.dto.UserRegisterDTO;
import com.ggrmtest.ppob.infrastructure.persistence.JwtService;
import com.ggrmtest.ppob.infrastructure.persistence.entity.User;
import com.ggrmtest.ppob.infrastructure.persistence.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;

  @Autowired
  private UserRepository userRepository;

  public AuthenticationService(
    AuthenticationManager authenticationManager,
    PasswordEncoder passwordEncoder,
    JwtService jwtService
  ) {
    this.authenticationManager = authenticationManager;
    this.passwordEncoder = passwordEncoder;
  }

  public UserRegisterDTO customerSignup(UserRegisterDTO input) {
    var user = userRepository.findByUsername(input.getUsername());
    if (user.isPresent()) {
      throw new RuntimeException("User already exists");
    }
    var inputDto = input
      .setPassword(passwordEncoder.encode(input.getPassword()))
      .setRole(Role.USER);
    userRepository.save(inputDto.toUser(new User()));
    return inputDto;
  }

  public UserRegisterDTO sellerSignup(UserRegisterDTO input) {
    var user = userRepository.findByUsername(input.getUsername());
    if (user.isPresent()) {
      throw new RuntimeException("User already exists");
    }
    var inputDto = input
      .setPassword(passwordEncoder.encode(input.getPassword()))
      .setRole(Role.ADMIN);
    userRepository.save(inputDto.toUser(new User()));
    return inputDto;
  }

  public User userAuthenticate(UserLoginDTO input) {
    authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(input.getUsername(), input.getPassword())
    );

    var user = userRepository.findByUsername(input.getUsername()).orElseThrow();

    return user;
  }
}
