import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div className="recipe-list">
      <h2>Recipes</h2>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found. Try a different search term.</p>
      ) : (
        filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-item">
            <h3>
              <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            </h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;