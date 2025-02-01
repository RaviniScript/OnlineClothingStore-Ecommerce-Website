package com.coursework.EadProduct.Service;

import com.coursework.EadProduct.Entity.Product;
import com.coursework.EadProduct.Entity.ProductVariant;
import com.coursework.EadProduct.Repository.ProductRepository;
import com.coursework.EadProduct.Repository.ProductVariantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductVariantService {

    @Autowired
    private ProductVariantRepository productVariantRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<ProductVariant> getAllVariants() {

        return productVariantRepository.findAll();
    }

    public Optional<ProductVariant> getVariantById(Long variantId) {

        return productVariantRepository.findById(variantId);
    }


    public ProductVariant addVariant(ProductVariant variant) {
        Long productId = variant.getProduct().getProductId();
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        variant.setProduct(product);

        return productVariantRepository.save(variant);
    }


    public ProductVariant updateVariant(Long variantId, ProductVariant variantDetails) {
        return productVariantRepository.findById(variantId).map(variant -> {
            variant.setSize(variantDetails.getSize());
            variant.setStockQuantity(variantDetails.getStockQuantity());
            variant.setProduct(variantDetails.getProduct());
            return productVariantRepository.save(variant);
        }).orElseThrow(() -> new RuntimeException("Variant not found"));
    }

    public void deleteVariant(Long variantId) {

        productVariantRepository.deleteById(variantId);
    }



}
