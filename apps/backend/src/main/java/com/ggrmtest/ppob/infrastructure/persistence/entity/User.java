package com.ggrmtest.ppob.infrastructure.persistence.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Entity
@Table(name = "users")
@Data
@Accessors(chain = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public abstract class User implements UserDetails {
  @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@NotNull(message = "First Name cannot be NULL")
  //@Pattern(regexp = "[A-Za-z.\\s]+", message = "Enter valid characters in first name")
	private String firstName;
	
	@NotNull(message = "Last Name cannot be NULL")
  //@Pattern(regexp = "[A-Za-z.\\s]+", message = "Enter valid characters in last name")
	private String lastName;
	
	@NotNull(message = "role cannot be NULL")
  private String role;
	
	@NotNull(message = "Please enter username")
	@Column(unique = true)
  //@Pattern(regexp = "^[A-Za-z][A-Za-z0-9_]{7,29}$", message = "Enter valid characters in username")
	private String username;
	
	@NotNull(message = "Please enter the password")
  //@Pattern(regexp = "[A-Za-z0-9!@#$%^&*_]{8,15}", message = "Password must be 8-15 characters in length and can include A-Z, a-z, 0-9, or special characters !@#$%^&*_")
	private String password;
	
	@Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
  List<GrantedAuthority> auths = new ArrayList<>();
    auths.add(new SimpleGrantedAuthority(getRole().toUpperCase()));
      return auths;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
  
  public String getPassword() {
    return password;
  }
  
  public User setUsername(String username) {
    this.username = username;
    return this;
  }
  
  public User setFirstName(String firstName) {
    this.firstName = firstName;
    return this;
  }
  
  public User setLastName(String lastName) {
    this.lastName = lastName;
    return this;
  }
  
  public User setRole(String role) {
    this.role = role;
    return this;
  }
  
  public User setPassword(String password) {
    this.password = password;
    return this;
  }

  @Override
  public String getUsername() {
    return username;
  }
}
