package com.ggrmtest.ppob.domain.dto;

import com.ggrmtest.ppob.common.enumeration.Role;
import com.ggrmtest.ppob.infrastructure.persistence.entity.User;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class UserRegisterDTO {
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private Role role;

	public static UserRegisterDTO fromUser(User user) {
		return new UserRegisterDTO().setUsername(user.getUsername()).setPassword(user.getPassword());
	}

	public User toUser(User user) {
		return user
			.setUsername(username)
			.setPassword(password)
			.setFirstName(firstName)
			.setLastName(lastName)
			.setRole(role);
	}
}
