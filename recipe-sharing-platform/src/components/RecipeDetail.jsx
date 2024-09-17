import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import recipesData from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchedRecipe = recipesData.find(r => r.id === parseInt(id)); // Ensure `id` is parsed correctly
    setRecipe(fetchedRecipe);
  }, [id]);

  if (!recipe) {
    return <div className="text-center">Loading...</div>; // Loading state
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover mb-4 shadow-lg rounded-md" />
      <h2 className="text-2xl font-semibold mt-6">Summary</h2>
      <p className="mb-4">{recipe.summary}</p>
      <h2 className="text-2xl font-semibold mt-6">Ingredients</h2>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="mb-1">{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mt-6">Cooking Steps</h2>
      <ol className="list-decimal list-inside mb-4">
        {recipe.steps.split('\n').map((step, index) => (
          <li key={index} className="mb-1">{step}</li>
        ))}
      </ol>
      <h2 className="text-2xl font-semibold mt-6">Instructions</h2>
      <p className="mb-4">{recipe.instructions}</p> {/* Add instructions section here */}
    </div>
  );
};

export default RecipeDetail;