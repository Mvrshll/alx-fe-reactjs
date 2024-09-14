import { useState } from 'react';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({}); // New state for errors

  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Recipe title is required.';
    if (!ingredients) newErrors.ingredients = 'Ingredients are required.';
    if (!steps) newErrors.steps = 'Cooking steps are required.';

    const ingredientList = ingredients.split(',').map(ingredient => ingredient.trim());
    if (ingredientList.length < 2) {
      newErrors.ingredients = 'Please provide at least two ingredients.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if validation fails
      return;
    }

    // Log the recipe data (or send it to your backend)
    console.log({ title, ingredients: ingredients.split(',').map(ingredient => ingredient.trim()), steps });

    // Clear the form
    setTitle('');
    setIngredients('');
    setSteps('');
    setErrors({});
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Add a New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6">
        {errors.title && <p className="text-red-500">{errors.title}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700">Recipe Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`mt-1 block w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            required
          />
        </div>
        {errors.ingredients && <p className="text-red-500">{errors.ingredients}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700">Ingredients (comma separated)</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className={`mt-1 block w-full border ${errors.ingredients ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            rows="4"
            required
          />
        </div>
        {errors.steps && <p className="text-red-500">{errors.steps}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700">Cooking Steps</label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className={`mt-1 block w-full border ${errors.steps ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
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