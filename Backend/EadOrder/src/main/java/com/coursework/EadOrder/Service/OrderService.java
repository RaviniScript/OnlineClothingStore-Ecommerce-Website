package com.coursework.EadOrder.Service;

import com.coursework.EadOrder.Entity.Order;
import com.coursework.EadOrder.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(Order order) {
        order.setStatus("PENDING"); // Default status
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }


    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order updateOrderStatus(Long orderId, String status) {
        Optional<Order> existingOrder = orderRepository.findById(orderId);
        if (existingOrder.isPresent()) {
            Order order = existingOrder.get();
            order.setStatus(status);
            return orderRepository.save(order);
        }
        return null;
    }

    // Delete an order
//    public void deleteOrder(Long orderId) {
//        orderRepository.deleteById(orderId);
//    }

    public String deleteOrder(Long orderId) {
        if (orderRepository.existsById(orderId)) {
            orderRepository.deleteById(orderId);
            return "Order deleted successfully!";
        } else {
            return "Order not found!";
        }
    }

}

