package com.ggrmtest.ppob.domain.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class LoginResponseDTO {
	
	private String token;
	private long expiresIn;

	public static LoginResponseDTO fromUser(String token, long expiresIn) {
		return new LoginResponseDTO().setToken(token).setExpiresIn(expiresIn);
	}
}
