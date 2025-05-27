package com.ggrmtest.ppob.domain.dto;

import com.ggrmtest.ppob.common.enumeration.Role;
import com.ggrmtest.ppob.infrastructure.persistence.entity.User;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class UserDetailDTO {

  private Long id;
  private String username;
  private String firstName;
  private String lastName;
  private Role role;

  public static UserDetailDTO fromUser(User user) {
    return new UserDetailDTO()
      .setId(user.getId())
      .setUsername(user.getUsername())
      .setFirstName(user.getFirstName())
      .setLastName(user.getLastName())
      .setRole(user.getRole());
  }
}
