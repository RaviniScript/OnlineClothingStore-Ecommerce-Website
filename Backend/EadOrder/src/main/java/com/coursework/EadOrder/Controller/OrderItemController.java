package com.coursework.EadOrder.Controller;

import com.coursework.EadOrder.Entity.OrderItem;
import com.coursework.EadOrder.Service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-items")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @PostMapping
    public ResponseEntity<OrderItem> addOrderItem(@RequestParam Long orderId,
                                                  @RequestParam Long productId,
                                                  @RequestParam int quantity,
                                                  @RequestParam double price) {
        OrderItem orderItem = orderItemService.addOrderItem(orderId, productId, quantity, price);
        return orderItem != null ? ResponseEntity.ok(orderItem) : ResponseEntity.badRequest().build();
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<List<OrderItem>> getOrderItemsByOrderId(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderItemService.getOrderItemsByOrderId(orderId));
    }


//    @DeleteMapping("/{orderItemId}")
//    public ResponseEntity<Void> deleteOrderItem(@PathVariable Long orderItemId) {
//        orderItemService.deleteOrderItem(orderItemId);
//        return ResponseEntity.noContent().build();
//    }

    @DeleteMapping("/{orderItemId}")
    public ResponseEntity<String> deleteOrderItem(@PathVariable Long orderItemId) {
        String message = orderItemService.deleteOrderItem(orderItemId);
        return ResponseEntity.ok(message);
    }

}
