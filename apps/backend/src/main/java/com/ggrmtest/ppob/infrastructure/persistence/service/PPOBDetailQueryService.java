package com.ggrmtest.ppob.infrastructure.persistence.service;

import com.ggrmtest.ppob.domain.dto.PPOBDetailDTO;

public interface PPOBDetailQueryService {
  PPOBDetailDTO findProductsByCategorySlug(String categorySlug, String inputNumber);
}
