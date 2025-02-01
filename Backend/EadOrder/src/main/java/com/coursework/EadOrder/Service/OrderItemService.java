package com.coursework.EadOrder.Service;

import com.coursework.EadOrder.Entity.Order;
import com.coursework.EadOrder.Entity.OrderItem;
import com.coursework.EadOrder.Repository.OrderItemRepository;
import com.coursework.EadOrder.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    public OrderItem addOrderItem(Long orderId, Long productId, int quantity, double price) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            OrderItem orderItem = new OrderItem(order, productId, quantity, price);
            return orderItemRepository.save(orderItem);
        }
        return null;
    }

    public List<OrderItem> getOrderItemsByOrderId(Long orderId) {
        return orderItemRepository.findByOrderOrderId(orderId);
    }

//    public void deleteOrderItem(Long orderItemId) {
//        orderItemRepository.deleteById(orderItemId);
//    }

    public String deleteOrderItem(Long orderItemId) {
        if (orderItemRepository.existsById(orderItemId)) {
            orderItemRepository.deleteById(orderItemId);
            return "Order item deleted successfully!";
        } else {
            return "Order item not found!";
        }
    }

}
