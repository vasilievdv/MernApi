import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';
import { checkAuth } from './redux/actions/userAction';
import Account from './components/Account/Account';
import People from './components/People/People';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  return (
    <>
      <NavBar />
      <div className="container py-2">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/account" element={<Account />} />
          <Route path="/people" element={<People />} />
        </Routes>
      </div>
    </>

  );
}

export default App;
