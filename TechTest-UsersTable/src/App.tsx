import { useEffect, useState } from 'react'
import './App.css'
import UsersList from './components/UsersList';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  return (
    <div className='App'>
      <h4>Tech Test</h4>
      <UsersList users={users}/>
    </div>
  )
}

export default App
