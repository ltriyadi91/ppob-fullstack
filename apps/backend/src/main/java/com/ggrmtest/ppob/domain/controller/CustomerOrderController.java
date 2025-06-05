package com.ggrmtest.ppob.domain.controller;

import com.ggrmtest.ppob.common.dto.GeneralResponseDTO;
import com.ggrmtest.ppob.domain.dto.DirectOrderDTO;
import com.ggrmtest.ppob.domain.dto.OrderDTO;
import com.ggrmtest.ppob.infrastructure.persistence.service.AuthenticationService;
import com.ggrmtest.ppob.infrastructure.persistence.service.OrderQueryService;
import com.ggrmtest.ppob.infrastructure.persistence.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(value = "/api/v1/orders")
@RestController
@RequiredArgsConstructor
public class CustomerOrderController {

  private final OrderQueryService orderQueryService;
  private final OrderService orderService;
  private final AuthenticationService authService;

  @PreAuthorize("hasAuthority('ADMIN')")
  @GetMapping("/paginated")
  public ResponseEntity<GeneralResponseDTO<Page<OrderDTO>>> searchOrders(
    @RequestParam(required = false) String searchTerm,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(defaultValue = "orderId") String sortBy,
    @RequestParam(defaultValue = "asc") String sortDir
  ) {
    Sort.Direction direction = sortDir.equalsIgnoreCase("desc")
      ? Sort.Direction.DESC
      : Sort.Direction.ASC;
    PageRequest pageRequest = PageRequest.of(page, size, Sort.by(direction, sortBy));

    Page<OrderDTO> orders = orderQueryService.findAllPaginatedOrders(
      searchTerm,
      pageRequest
    );

    var resp = new GeneralResponseDTO<Page<OrderDTO>>();
    return resp.ok(orders);
  }

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

  @PostMapping("/cart")
  @PreAuthorize("hasAuthority('USER')")
  public ResponseEntity<OrderDTO> createOrderFromCart() {
    Authentication authentication = SecurityContextHolder
      .getContext()
      .getAuthentication();
    String username = authentication.getName();
    var user = authService.findByUserName(username);
    var order = orderService.placeOrderFromCart(user.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body(order);
  }

  @PostMapping("/direct")
  @PreAuthorize("hasAuthority('USER')")
  public ResponseEntity<OrderDTO> createDirectOrder(
    @RequestBody DirectOrderDTO directOrderDTO
  ) {
    Authentication authentication = SecurityContextHolder
      .getContext()
      .getAuthentication();
    String username = authentication.getName();
    var user = authService.findByUserName(username);
    var order = orderService.placeDirectOrder(user.getId(), directOrderDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(order);
  }
}
