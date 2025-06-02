package com.ggrmtest.ppob.domain.controller;

import com.ggrmtest.ppob.domain.dto.AddToCartDTO;
import com.ggrmtest.ppob.domain.dto.CartDTO;
import com.ggrmtest.ppob.domain.dto.CartItemDTO;
import com.ggrmtest.ppob.infrastructure.persistence.service.AuthenticationService;
import com.ggrmtest.ppob.infrastructure.persistence.service.CartItemService;
import com.ggrmtest.ppob.infrastructure.persistence.service.CartQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(value = "/api/v1/cart")
@RestController
@RequiredArgsConstructor
public class CustomerCartController {

  private final CartQueryService cartQueryService;
  private final CartItemService cartItemService;
  private final AuthenticationService authService;

  @PostMapping
  @PreAuthorize("hasAuthority('USER')")
  public ResponseEntity<CartItemDTO> addToCart(@RequestBody AddToCartDTO addToCartDTO) {
    Authentication authentication = SecurityContextHolder
      .getContext()
      .getAuthentication();
    String username = authentication.getName();
    var user = authService.findByUserName(username);
    var addToCart = cartItemService.saveCartItem(
      user.getId(),
      addToCartDTO.getProductId()
    );
    return ResponseEntity.status(HttpStatus.OK).body(addToCart);
  }

  @GetMapping
  public ResponseEntity<CartDTO> getCart() {
    Authentication authentication = SecurityContextHolder
      .getContext()
      .getAuthentication();
    String username = authentication.getName();
    var user = authService.findByUserName(username);
    var cart = cartQueryService.findCartByUserId(user.getId());

    return ResponseEntity.status(HttpStatus.OK).body(cart);
  }
}
