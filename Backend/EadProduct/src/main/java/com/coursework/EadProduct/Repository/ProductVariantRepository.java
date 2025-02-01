package com.coursework.EadProduct.Repository;

import com.coursework.EadProduct.Entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductVariantRepository extends JpaRepository <ProductVariant,Long> {
    @Query("SELECT pv FROM ProductVariant pv JOIN FETCH pv.product WHERE pv.variantId = :variantId")
    ProductVariant findByVariantIdWithProduct(@Param("variantId") Long variantId);

}
