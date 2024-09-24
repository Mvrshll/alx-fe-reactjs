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
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);
  const isFavorite = useRecipeStore((state) => state.favorites.includes(parseInt(id)));

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const handleDelete = () => {
    deleteRecipe(recipe.id);
    navigate('/');
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe.id);
    }
  };

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <button onClick={toggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <EditRecipeForm recipe={recipe} />
      <button onClick={handleDelete} className="delete-button">Delete Recipe</button>
    </div>
  );
};

export default RecipeDetails;