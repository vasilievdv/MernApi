import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../../redux/actions/userAction';

function NavBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signOut());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mx-auto">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
          </ul>
        </div>
      </div>
      {user
        ? (
          <div className="container justify-content-end">
            <div className="row justify-content-end">
              <div className="span5">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link active" to="/account" aria-current="page" href="/account">Hello,
                      {` ${user.name}`}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/people" className="nav-link active" aria-current="page">People</Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={submitHandler} to="/" className="nav-link active" aria-current="page">Sign out</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="container justify-content-end">
            <div className="row justify-content-end">
              <div className="span5" />
            </div>
          </div>
        )}

    </nav>
  );
}

export default NavBar;
