package com.ggrmtest.ppob.infrastructure.persistence.repository;

import com.ggrmtest.ppob.infrastructure.persistence.entity.PrefixNumber;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrefixNumberRepository extends JpaRepository<PrefixNumber, Long> {
  Optional<PrefixNumber> findByPrefixNumber(String prefix);
}
