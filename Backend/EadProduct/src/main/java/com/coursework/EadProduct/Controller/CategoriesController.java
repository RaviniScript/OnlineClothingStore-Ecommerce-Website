package com.coursework.EadProduct.Controller;
import com.coursework.EadProduct.Entity.Categories;
import com.coursework.EadProduct.Service.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/categories")
public class CategoriesController {

    @Autowired
    private CategoriesService categoriesService;

    @GetMapping
    public List<Categories> getAllCategories() {

        return categoriesService.getAllCategories();
    }


    @GetMapping("/{id}")
    public Categories getCategoryById(@PathVariable Long categoryId) {
        return categoriesService.getCategoryById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @PostMapping
    public Categories addCategory(@RequestBody Categories category) {

        return categoriesService.addCategory(category);
    }

    @PutMapping("/{id}")
    public Categories updateCategory(@PathVariable Long categoryId, @RequestBody Categories categoryDetails) {

        return categoriesService.updateCategory(categoryId, categoryDetails);
    }

    @DeleteMapping("/{categoryId}")
    public String deleteCategory(@PathVariable Long categoryId) {
    categoriesService.deleteCategory(categoryId);
    return "Category deleted successfully";
  }

}
