import './App.css'
import HomePage from './components/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RecipeDetail from './components/RecipeDetail'


function App() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-blue-500">Welcome to the Recipe Sharing Platform!</h1>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </div>
      </Router>
    </div>
    
  );
}

export default App
