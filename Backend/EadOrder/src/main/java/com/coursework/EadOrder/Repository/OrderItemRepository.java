package com.coursework.EadOrder.Repository;

import com.coursework.EadOrder.Entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrderOrderId(Long orderId); // Retrieve all items for a specific order
}



