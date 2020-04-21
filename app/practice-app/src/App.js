import React, { useState } from "react";
import RegisterForm from './RegisterForm'
import './App.css';

function App() {

  const [state, setState] = useState({
    step: 1,
    username: '',
    password: ''
  });

  const next = () => {
    const { step } = state;
    setState({
      step: step ++
    })
  };

  const previous = () => {
    const { step } = state;
    setState({
      step: step --
    })
  };

  const values = {
    ...state
  };

  switch(state.step) {
    case 1:
      return (
        <RegisterForm next={next} previoust={previous} values={values} />
      )
  }
}

export default App;