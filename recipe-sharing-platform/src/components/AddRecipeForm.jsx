import { useState } from 'react';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!title || !ingredients || !instructions) {
      setError('All fields are required.');
      return;
    }

    const ingredientList = ingredients.split(',').map(ingredient => ingredient.trim());
    if (ingredientList.length < 2) {
      setError('Please provide at least two ingredients.');
      return;
    }

    // Here you would typically send the data to your backend or update local state
    console.log({ title, ingredients: ingredientList, instructions });

    // Clear the form
    setTitle('');
    setIngredients('');
    setInstructions('');
    setError('');
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Add a New Recipe</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Recipe Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ingredients (comma separated)</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cooking Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200">
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;