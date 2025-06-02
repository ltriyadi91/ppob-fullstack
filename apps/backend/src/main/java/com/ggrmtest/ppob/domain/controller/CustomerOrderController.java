package com.ggrmtest.ppob.domain.controller;

import com.ggrmtest.ppob.domain.dto.OrderDTO;
import com.ggrmtest.ppob.infrastructure.persistence.service.AuthenticationService;
import com.ggrmtest.ppob.infrastructure.persistence.service.OrderQueryService;
import com.ggrmtest.ppob.infrastructure.persistence.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(value = "/api/v1/order")
@RestController
@RequiredArgsConstructor
public class CustomerOrderController {

  private final OrderQueryService orderQueryService;
  private final OrderService orderService;
  private final AuthenticationService authService;

  @GetMapping
  public ResponseEntity<OrderDTO> getOrder() {
    Authentication authentication = SecurityContextHolder
      .getContext()
      .getAuthentication();

    String username = authentication.getName();
    var user = authService.findByUserName(username);
    var cart = orderQueryService.findOrderByUserId(user.getId());

    return ResponseEntity.status(HttpStatus.OK).body(cart);
  }

  @PostMapping
  @PreAuthorize("hasAuthority('USER')")
  public ResponseEntity<OrderDTO> createOrder() {
    Authentication authentication = SecurityContextHolder
      .getContext()
      .getAuthentication();
    String username = authentication.getName();
    var user = authService.findByUserName(username);
    var order = orderService.placeOrder(user.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body(order);
  }
}
