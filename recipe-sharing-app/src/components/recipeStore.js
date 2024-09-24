import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],
  addRecipe: (newRecipe) => set((state) => {
    const updatedRecipes = [...state.recipes, { ...newRecipe, id: Date.now() }];
    return { 
      recipes: updatedRecipes,
      filteredRecipes: get().filterRecipes(updatedRecipes, state.searchTerm)
    };
  }),
  updateRecipe: (id, updatedRecipe) => set((state) => {
    const updatedRecipes = state.recipes.map((recipe) => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    );
    return {
      recipes: updatedRecipes,
      filteredRecipes: get().filterRecipes(updatedRecipes, state.searchTerm)
    };
  }),
  deleteRecipe: (id) => set((state) => {
    const updatedRecipes = state.recipes.filter((recipe) => recipe.id !== id);
    return {
      recipes: updatedRecipes,
      filteredRecipes: get().filterRecipes(updatedRecipes, state.searchTerm),
      favorites: state.favorites.filter(favId => favId !== id),
    };
  }),
  setSearchTerm: (term) => set((state) => ({
    searchTerm: term,
    filteredRecipes: get().filterRecipes(state.recipes, term)
  })),
  filterRecipes: (recipes, term) => recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(term.toLowerCase()) ||
    recipe.description.toLowerCase().includes(term.toLowerCase())
  ),
  setRecipes: (recipes) => set({ 
    recipes,
    filteredRecipes: get().filterRecipes(recipes, get().searchTerm)
  }),
  addFavorite: (recipeId) => set((state) => ({ 
    favorites: [...state.favorites, recipeId] 
  })),
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  generateRecommendations: () => set((state) => {
    // Simple recommendation logic based on favorites
    const nonFavorites = state.recipes.filter(recipe => !state.favorites.includes(recipe.id));
    const recommended = nonFavorites.sort(() => 0.5 - Math.random()).slice(0, 3);
    return { recommendations: recommended };
  }),
}));

export default useRecipeStore;