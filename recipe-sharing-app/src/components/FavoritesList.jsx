import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore(state => 
    state.favorites.map(id => state.recipes.find(recipe => recipe.id === id))
  );
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  return (
    <div className="favorites-list">
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>You havent added any favorites yet.</p>
      ) : (
        favorites.map(recipe => (
          <div key={recipe.id} className="favorite-item">
            <h3>
              <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            </h3>
            <p>{recipe.description}</p>
            <button onClick={() => removeFavorite(recipe.id)}>Remove from Favorites</button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;