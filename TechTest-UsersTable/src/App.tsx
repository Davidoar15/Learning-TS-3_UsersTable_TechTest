import { useEffect, useState } from 'react'
import './App.css'
import UsersList from './components/UsersList';
import { User } from './types';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => { 
    setSortByCountry((prevState) => !prevState) 
  };

  const sortedUsers = sortByCountry 
    ? users.toSorted((a, b) => {
      return a.location.country.localeCompare(b.location.country);
    }) 
    : users;

  // * One solution to sort users and back to original array
  /*const sortedUsers = sortByCountry 
    ? [...users].sort((a, b) => {
      return a.location.country.localeCompare(b.location.country);
    }) 
    : users;*/

  return (
    <div className='App'>
      <h4>Tech Test</h4>
      <header>
        <button onClick={toggleColors}>
          Color Rows
        </button>

        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'Not Sort by Country' : 'Sort by Country'}
        </button>
      </header>
      <main>
        <UsersList users={sortedUsers} showColors={showColors}/>
      </main>
    </div>
  )
}

export default App
