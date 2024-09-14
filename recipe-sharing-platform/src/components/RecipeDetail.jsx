// src/components/RecipeDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import recipesData from '../data.json'; // Ensure this is the correct path

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchedRecipe = recipesData.find(r => r.id === parseInt(id));
    setRecipe(fetchedRecipe);
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover mb-4" />

      <h2 className="text-2xl font-semibold mt-6">Summary</h2>
      <p className="mb-4">{recipe.summary}</p>

      <h2 className="text-2xl font-semibold mt-6">Ingredients</h2>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="mb-1">{ingredient}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-6">Cooking Instructions</h2>
      <ol className="list-decimal list-inside mb-4">
        {recipe.instructions.map((step, index) => (
          <li key={index} className="mb-1">{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;