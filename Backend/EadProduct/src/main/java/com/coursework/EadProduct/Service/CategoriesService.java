package com.coursework.EadProduct.Service;

import com.coursework.EadProduct.Entity.Categories;
import com.coursework.EadProduct.Repository.CategoriesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriesService {
    @Autowired
    private CategoriesRepository categoriesRepository;

    public List<Categories> getAllCategories() {
        return categoriesRepository.findAll();
    }

    public Optional<Categories> getCategoryById(Long categoryId) {
        return categoriesRepository.findById(categoryId);
    }

    public Categories addCategory(Categories category) {
        return categoriesRepository.save(category);
    }

    public Categories updateCategory(Long categoryId, Categories categoryDetails) {
        return categoriesRepository.findById(categoryId).map(existingCategory -> {
            existingCategory.setCategoryName(categoryDetails.getCategoryName());
            return categoriesRepository.save(existingCategory);
        }).orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public void deleteCategory(Long categoryId) {
        categoriesRepository.deleteById(categoryId);
    }
}
