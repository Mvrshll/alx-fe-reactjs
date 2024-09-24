import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
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
      filteredRecipes: get().filterRecipes(updatedRecipes, state.searchTerm)
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
  })
}));

export default useRecipeStore;