package com.coursework.EadOrder.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    @JsonBackReference
    private Order order;

    @Column(nullable = false)
    private Long productId;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private double total;

    public OrderItem() {
    }

    public OrderItem(Order order, Long productId, int quantity, double price) {
        this.order = order;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
        this.total = quantity * price;
    }

    public Long getOrderItemId() { return orderItemId; }
    public void setOrderItemId(Long orderItemId) { this.orderItemId = orderItemId; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
        this.total = this.price * quantity;
    }

    public double getPrice() { return price; }
    public void setPrice(double price) {
        this.price = price;
        this.total = this.price * this.quantity;
    }

    public double getTotal() { return total; }
}