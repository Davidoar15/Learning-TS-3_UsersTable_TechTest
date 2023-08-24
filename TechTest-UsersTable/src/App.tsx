import { useEffect, useState } from 'react'
import './App.css'
import UsersList from './components/UsersList';

function App() {
  const [users, setUsers] = useState([]);
  const [showColors, setShowColors] = useState(false);

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

  return (
    <div className='App'>
      <h4>Tech Test</h4>
      <header>
        <button onClick={toggleColors}>
          Color Rows
        </button>
      </header>
      <main>
        <UsersList users={users} showColors={showColors}/>
      </main>
    </div>
  )
}

export default App
