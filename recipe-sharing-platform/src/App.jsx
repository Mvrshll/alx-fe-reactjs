import './App.css'
import HomePage from './components/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RecipeDetail from './components/RecipeDetail'
import AddRecipeForm from './components/AddRecipeForm'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'


function App() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-blue-500">Welcome to the Recipe Sharing Platform!</h1>
      <Router>
        <div className="bg-white dark:bg-gray-800 transition duration-300 min-h-screen">
          <NavBar />
          <div className="container mx-auto">
            <ThemeToggle />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/new-recipe" element={<AddRecipeForm />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </div>
    
  );
}

export default App
