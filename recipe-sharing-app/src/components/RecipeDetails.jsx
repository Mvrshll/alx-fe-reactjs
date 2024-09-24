import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((state) => 
    state.recipes.find((recipe) => recipe.id === parseInt(id))
  );
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const handleDelete = () => {
    deleteRecipe(recipe.id);
    navigate('/');
  };

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <EditRecipeForm recipe={recipe} />
      <button onClick={handleDelete} className="delete-button">Delete Recipe</button>
    </div>
  );
};

export default RecipeDetails;