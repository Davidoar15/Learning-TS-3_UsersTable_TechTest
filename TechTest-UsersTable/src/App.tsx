import { useEffect, useState, useRef, useMemo } from 'react'
import './App.css'
import UsersList from './components/UsersList';
import { SortBy, User } from './types.d';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
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
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    let sortedFn = (a: User, b: User) => a.location.country.localeCompare(b.location.country)

    if (sorting === SortBy.NAME) {
      sortedFn = (a, b) => a.name.first.localeCompare(b.name.first);
    };

    if (sorting === SortBy.LAST) {
      sortedFn = (a, b) => a.name.last.localeCompare(b.name.last);
    };

    return filteredUsers.toSorted(sortedFn);
  }, [filteredUsers, sorting]);

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

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  }

  return (
    <div className='App'>
      <h4>Tech Test</h4>
      <header>
        <button onClick={toggleColors}>
          Color Rows
        </button>

        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'Not Sort by Country' : 'Sort by Country'}
        </button>

        <button onClick={handleReset}>
          Reset List
        </button>

        <input placeholder='Search by Country' onChange={(event) => {
          setFilterCountry(event.target.value)
        }}/>
      </header>
      <main>
        <UsersList users={sortedUsers} showColors={showColors} handleDelete={handleDelete} changeSorting={handleChangeSort}/>
      </main>
    </div>
  )
}

export default App
