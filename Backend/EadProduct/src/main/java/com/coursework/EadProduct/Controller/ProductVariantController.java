package com.coursework.EadProduct.Controller;
import com.coursework.EadProduct.Entity.ProductVariant;
import com.coursework.EadProduct.Service.ProductVariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/variants")
public class ProductVariantController {

    @Autowired
    private ProductVariantService productVariantService;

    @GetMapping
    public List<ProductVariant> getAllVariants() {
        return productVariantService.getAllVariants();
    }


    @GetMapping("/{variantId}")
    public ProductVariant getVariantById(@PathVariable Long variantId) {
        return productVariantService.getVariantById(variantId).orElseThrow(() -> new RuntimeException("Variant not found"));
    }

    @PostMapping
    public ProductVariant addVariant(@RequestBody ProductVariant variant) {
        return productVariantService.addVariant(variant);
    }

    @PutMapping("/{variantId}")
    public ProductVariant updateVariant(@PathVariable Long variantId, @RequestBody ProductVariant variantDetails) {
        return productVariantService.updateVariant(variantId, variantDetails);
    }

    @DeleteMapping("/{variantId}")
    public void deleteVariant(@PathVariable Long variantId) {
        productVariantService.deleteVariant(variantId);
    }

}
