import { useEffect, useState, useRef, useMemo } from 'react'
import './App.css'
import UsersList from './components/UsersList';
import { User } from './types';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);
  const originalUsers = useRef<User[]>([]); //? Save a value that we want share between renders, but when change not return to render the component
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
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

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    return sortByCountry 
      ? filteredUsers.toSorted(
        (a, b) => a.location.country.localeCompare(b.location.country)
      )
      : filteredUsers
  }, [filteredUsers, sortByCountry]);

  // * One solution to sort users and back to original array
  /*const sortedUsers = sortByCountry 
    ? [...users].sort((a, b) => {
      return a.location.country.localeCompare(b.location.country);
    }) 
    : users;*/

  const handleDelete = (uuid: string) => {
    const filteredUsers = users.filter((user) => user.login.uuid !== uuid);
    setUsers(filteredUsers);
  };

  const handleReset = () => {
    setUsers(originalUsers.current)
  };

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

        <button onClick={handleReset}>
          Reset List
        </button>

        <input placeholder='Search by Country' onChange={(event) => {
          setFilterCountry(event.target.value)
        }}/>
      </header>
      <main>
        <UsersList users={sortedUsers} showColors={showColors} handleDelete={handleDelete}/>
      </main>
    </div>
  )
}

export default App
