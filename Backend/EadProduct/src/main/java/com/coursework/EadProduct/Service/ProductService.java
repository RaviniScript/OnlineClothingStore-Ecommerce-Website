package com.coursework.EadProduct.Service;


import com.coursework.EadProduct.Entity.Product;
import com.coursework.EadProduct.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long productId) {

        return productRepository.findById(productId);
    }


    public Product addProduct(Product product){

        return productRepository.save(product);
    }

    public Product updateProduct(Long productId, Product productDetails) {
        return productRepository.findById(productId).map(product -> {
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            product.setCategory(productDetails.getCategory());
            product.setImageUrl(productDetails.getImageUrl());
            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product cannot be found"));
    }

    public void deleteProduct(Long productId){

        productRepository.deleteById(productId);
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryCategoryId(categoryId);
    }


}
