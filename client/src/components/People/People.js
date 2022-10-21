import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/actions/userAction';
import Card from '../Card/Card';

const { REACT_APP_HOST: host } = process.env;

function People() {
  const users = useSelector((state) => state.allusers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="d-flex justify-content-evenly flex-wrap">
      {users.length ? users.map((el) => <Card key={el.id} img={`${host}/uploads/${el.photo}`} name={el.username} age={el.birthdate} />) : <div />}
    </div>
  );
}

export default People;
