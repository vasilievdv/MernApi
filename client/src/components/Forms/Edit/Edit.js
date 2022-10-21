import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { editUser } from '../../../redux/actions/userAction';

function SignUp() {
  const error = useSelector((state) => state.error);

  const [userEditUser, setEditUser] = useState({});
  const [uploadFile, setUploadFile] = useState({});

  const changeHandler = (e) => {
    setEditUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const data = JSON.stringify(userEditUser);
    formData.append('data', data);
    const file = uploadFile[0];
    formData.append('file', file);
    dispatch(editUser(formData, navigate));
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={submitHandler} className="flex-column bg-light text-dark p-3 border rounded-3" id="myform">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input onChange={changeHandler} type="name" name="username" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password </label>
          <input onChange={changeHandler} type="password" name="password" className="form-control" />
        </div>

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">Photo</label>
          <input onChange={(e) => setUploadFile(e.target.files)} className="form-control" type="file" id="formFile" />
        </div>
        <p className="text-danger">{error.message}</p>
        <button type="submit" className="btn btn-primary">Edit</button>
      </form>
    </div>
  );
}

export default SignUp;
