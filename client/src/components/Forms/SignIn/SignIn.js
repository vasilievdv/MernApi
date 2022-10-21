import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../../redux/actions/userAction';

function SignUp() {
  const [userSignIn, setUserSignIn] = useState({});

  const changeHandler = (e) => {
    setUserSignIn((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(userSignIn));
    document.getElementById('signin').reset();
  };

  return (
    <form onSubmit={submitHandler} className="bg-light text-dark p-3 border rounded-3" id="signin">
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input onChange={changeHandler} type="name" name="username" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Password </label>
        <input onChange={changeHandler} type="password" name="password" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Sign In</button>
    </form>
  );
}

export default SignUp;
