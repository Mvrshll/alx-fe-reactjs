import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">Recipe Sharing</Link>
        <div>
          <Link to="/new-recipe" className="text-white px-4 hover:underline">Add Recipe</Link>
          <Link to="/about" className="text-white px-4 hover:underline">About</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;