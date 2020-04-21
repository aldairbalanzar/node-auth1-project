import React, { useState, useEffect } from "react";
// import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from './utils/auxiosWithAuth';
import './App.css';

function App() {
  // const history = useHistory();

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
});

  const [message, setMessage] = useState('');

const handleChange = e => {
  setCredentials({
    ...credentials,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = e => {
  e.preventDefault();
  axiosWithAuth()
    .post('/api/auth/register', credentials)
    .then(res => {
      console.log('handleSubmit res:', res.data);
      setMessage(res.data.messsage)
      console.log(message)
      setCredentials({
        username: '',
        password: ''
      })
    })
    .catch(err => console.log(err));
}

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="username"
            />
        </label>

        <label htmlFor="password">
          <input
            type="text"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="password"
            />
        </label>

        <button type="submit"> register </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;
