import './App.css';
import { useState } from 'react';

import RecipeCard from './RecipeCard';
import Searchbar from './Searchbar';

function App() {
  const [results, setResults] = useState([]);

  return (
    <div>
    <Searchbar 
      onRecipesChange={setResults} 
    />
    <RecipeCard 
      results={results}
    />
    </div>
  );
}

export default App;
