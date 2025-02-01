package com.coursework.EadProduct.Repository;

import com.coursework.EadProduct.Entity.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriesRepository extends JpaRepository <Categories, Long>{
}
