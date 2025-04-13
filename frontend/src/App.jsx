import { useState } from 'react';
import LoginForm from './components/LoginForm';
import LinkForm from './components/LinkForm';
import Dashboard from './components/Dashboard';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/", {
        withCredentials: true, 
      });
      setUser(response.data.data); 
      console.log("logged in");
    } catch (error) {
      console.log("Not logged in");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);


  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">URL Shortener Dashboard</h1>
      <LinkForm />
      <Dashboard onLinkSelect={setSelectedLinkId} />
      
    </div>
  );
}

export default App;