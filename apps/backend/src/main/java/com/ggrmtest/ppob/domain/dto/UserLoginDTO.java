package com.ggrmtest.ppob.domain.dto;

import com.ggrmtest.ppob.infrastructure.persistence.entity.User;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class UserLoginDTO  {
	private String username;
	private String password;

	public static UserRegisterDTO fromUser(User user) {
		return new UserRegisterDTO().setUsername(user.getUsername()).setPassword(user.getPassword());
	}

	public User toUser(User user) {
		return user
			.setUsername(username)
			.setPassword(password);
	}
}
