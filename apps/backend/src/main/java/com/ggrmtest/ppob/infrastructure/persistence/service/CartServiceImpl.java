package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.CartDTO;
import com.ggrmtest.ppob.infrastructure.persistence.entity.Cart;
import com.ggrmtest.ppob.infrastructure.persistence.repository.CartRepository;
import com.ggrmtest.ppob.infrastructure.persistence.repository.UserRepository;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

  private final CartRepository cartRepository;
  private final UserRepository userRepository;

  @Override
  public CartDTO saveCartByUserId(Long userId) {
    var cart = cartRepository.findByUserId(userId);
    var user = userRepository.findById(userId);

    if (Objects.isNull(cart)) {
      cart = new Cart().setUser(user.get());
    }
    var savedCart = cartRepository.save(cart);

    return CartDTO.fromCart(savedCart);
  }
}
