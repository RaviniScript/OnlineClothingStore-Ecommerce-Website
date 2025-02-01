package com.coursework.EadProduct.Controller;

import com.coursework.EadProduct.Entity.Product;
import com.coursework.EadProduct.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable Long productId) {

        return productService.getProductById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {

        return productService.addProduct(product);
    }

    @PutMapping("/{productId}")
    public Product updateProduct(@PathVariable Long productId, @RequestBody Product productDetails) {
        return productService.updateProduct(productId, productDetails);
    }


    @DeleteMapping("/{productId}")
    public String deleteProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
        return "Product deleted successfully";
    }

    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Long categoryId) {
        return productService.getProductsByCategory(categoryId);
    }
}
