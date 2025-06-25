// src/components/UserCard.jsx
import React from 'react';


const UserCard = ({ user, onEdit }) => {
  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Компанія: {user.company?.name}</p>
      {onEdit && (
        <button className="edit-btn" onClick={() => onEdit(user)}>
        Редагувати
      </button>
      
      )}
    </div>
  );
};

export default UserCard;
