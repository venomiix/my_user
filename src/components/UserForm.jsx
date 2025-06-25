// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';

const UserForm = ({ onSave, onCancel, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [company, setCompany] = useState(initialData?.company?.name || '');

  // Оновлюємо стан, якщо змінився initialData (для редагування)
  useEffect(() => {
    setName(initialData?.name || '');
    setEmail(initialData?.email || '');
    setCompany(initialData?.company?.name || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Будь ласка, заповніть ім\'я та email');
      return;
    }
    onSave({
      id: initialData?.id || Date.now(), // id для нових користувачів — генерація timestamp
      name,
      email,
      company: { name: company }
    });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div>
        <label>Ім'я:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Компанія:</label>
        <input type="text" value={company} onChange={e => setCompany(e.target.value)} />
      </div>
      <div className="buttons">
        <button type="submit">Зберегти</button>
        <button type="button" onClick={onCancel}>Скасувати</button>
      </div>
    </form>
  );
};

export default UserForm;
