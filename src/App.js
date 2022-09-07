import React, { useState, useEffect } from 'react';
import axios from 'axios'
import CharacterGrid from './components/characters/CharacterGrid';
import Header from './components/ui/Header';
import Search from './components/ui/Search';
import './App.css';


const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(`https://www.breakingbadapi.com/api/characters?name=${query}`)
      
      // console.log(result.data)

      setItems(result.data)
      setIsLoading(false)
    }

    fetchItems()
  }, [query]) // Adding query as a depency means that every time we update query useEffect will reload the api request

  return (
    <div className='container'>
      <Header />
      <Search getQuery={(q) => setQuery(q)} /> 
      {/* passing a fuction down to search as a prop. When called the function updates the query state in the app */}
      <CharacterGrid isLoading={isLoading} items={items} />
    </div>
  );
}

export default App;
