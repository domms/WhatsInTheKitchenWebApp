import './App.css';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { Card, Icon, Container, Grid, Button, GridColumn, Sticky } from 'semantic-ui-react';
import RecipeCard from './RecipeCard';
import Searchbar from './Searchbar';

const App = (props) => {
  const [results, setResults] = useState([]);

  return (
    <div>
      <Sticky>
      <Searchbar 
      onRecipesChange={setResults} 
    />
      </Sticky>
    <RecipeCard 
      results={results}
    />    
    </div>
  );
};

export default App;
