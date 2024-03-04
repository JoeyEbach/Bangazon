import React, { useEffect, useState } from 'react';
import { categoryFirstThreeProducts } from '../controllers/categoryData';
import CategoryCard from '../components/CategoryCard';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    categoryFirstThreeProducts()?.then(setCategories);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div>
      <h3>Viewing All Categories</h3>
      {categories.map((category) => (
        <CategoryCard key={categories.id} categoryObj={category} onUpdate={getAllCategories} />
      ))}
    </div>
  );
}
