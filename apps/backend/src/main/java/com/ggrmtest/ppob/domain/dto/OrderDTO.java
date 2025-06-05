package com.ggrmtest.ppob.domain.dto;

import com.ggrmtest.ppob.infrastructure.persistence.entity.Order;
import java.math.BigDecimal;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class OrderDTO {

  private Long id;
  private UUID orderId;
  private String userLastName;
  private BigDecimal totalAmount;
  private String createdAt;
  private String status;
  private List<OrderItemDTO> orderItems;

  public static OrderDTO fromOrder(Order order) {
    return new OrderDTO()
      .setId(order.getId())
      .setStatus(order.getStatus().name())
      .setOrderId(order.getOrderId())
      .setUserLastName(order.getUser().getLastName())
      .setTotalAmount(order.getTotalAmount())
      .setCreatedAt(
        order
          .getAuditInfo()
          .getCreatedAt()
          .atZone(ZoneId.systemDefault())
          .toLocalDateTime()
          .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
      );
  }

  public Order toOrder(Order order) {
    return order.setId(id).setOrderId(orderId).setTotalAmount(totalAmount);
  }
}
