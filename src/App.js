import logo from './logo.svg';
import './App.css';
import { Input } from 'semantic-ui-react'
import { useState } from 'react';

import RecipeCard from './RecipeCard';
import Searchbar from './Searchbar';

function App() {
  const [recipes, setRecipes] = useState([]);

  return (
    <div>
    <Searchbar 
    onRecipesChange={setRecipes} 
    />
    <RecipeCard 
    recipes={recipes}
     />
    </div>
  );
}

export default App;
