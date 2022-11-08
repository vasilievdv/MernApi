import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../../redux/actions/userAction';
import isFileImage from '../../../utils/helpers/isFileImage.helpers';
import resizeFile from '../../../utils/helpers/resizeFile.helpers';

function SignUp() {
  const error = useSelector((state) => state.error);

  const [userSignUp, setUserSignUp] = useState({});
  const [uploadFile, setUploadFile] = useState({});

  const changeHandler = (e) => {
    setUserSignUp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const data = JSON.stringify(userSignUp);
    formData.append('data', data);
    const image = uploadFile[0];
    if (isFileImage(image)) {
      try {
        const file = await resizeFile(image);
        formData.append('file', file);
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(signUp(formData));
  };

  return (
    <form onSubmit={submitHandler} className="flex-column bg-light text-dark p-3 border rounded-3" id="myform">
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input onChange={changeHandler} type="name" name="username" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Email </label>
        <input onChange={changeHandler} type="email" name="email" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Password </label>
        <input onChange={changeHandler} type="password" name="password" className="form-control" />
      </div>
      <div className="mb-3 ">
        <label className="form-label">Date of Birth </label>
        <input onChange={changeHandler} type="date" name="birthdate" className="form-control" />
      </div>
      <div className="mb-3 ">
        <div className="form-check form-check-inline">
          <input onChange={changeHandler} className="form-check-input" type="radio" name="sex" id="inlineRadio1" value="Male" />
          <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
        </div>
        <div className="form-check form-check-inline">
          <input onChange={changeHandler} className="form-check-input" type="radio" name="sex" id="inlineRadio2" value="Female" />
          <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">Photo</label>
        <input onChange={(e) => setUploadFile(e.target.files)} className="form-control" type="file" id="formFile" />
      </div>
      <p className="text-danger">{error.message}</p>
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
  );
}

export default SignUp;
