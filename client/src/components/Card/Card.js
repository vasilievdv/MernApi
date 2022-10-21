import React from 'react';

function Card({ img, name, age }) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={img} className="card-img-top" alt="avatar" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{age}</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  );
}

export default Card;
