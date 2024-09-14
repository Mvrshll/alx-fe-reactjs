// src/components/HomePage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import recipesData from '../data.json'; // Adjust the path if necessary

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setRecipes(recipesData);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Recipe Sharing Platform</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map(recipe => (
          <div key={recipe.id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <p className="text-gray-600">{recipe.summary}</p>
              <Link to={`/recipe/${recipe.id}`} className="text-blue-500 hover:underline mt-2 inline-block">
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link to="/new-recipe" className="text-blue-500 hover:underline mt-4 block text-center">
        Add a New Recipe
      </Link>
    </div>
  );
};

export default HomePage;