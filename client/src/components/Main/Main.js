import React from 'react';
import SignUp from '../Forms/SignUp/SignUp';
import SignIn from '../Forms/SignIn/SignIn';

function Main() {
  return (
    <div className="d-flex justify-content-around">
      <SignUp />
      <SignIn />
    </div>

  );
}

export default Main;
