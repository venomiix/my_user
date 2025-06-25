import React, { useEffect, useState } from 'react';
import UserCard from './components/UserCard';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import SearchBar from './components/SearchBar';
import SortSelect from './components/SortSelect';
import UserForm from './components/UserForm';

const App = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Помилка завантаження користувачів');
        return res.json();
      })
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.name.localeCompare(b.name);
      else return b.name.localeCompare(a.name);
    });

  const handleAddClick = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleSaveUser = (userData) => {
    if (editingUser) {
      // Редагування: оновлюємо користувача
      setUsers(users.map(u => (u.id === userData.id ? userData : u)));
    } else {
      // Додавання: додаємо нового користувача
      setUsers([userData, ...users]);
    }
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="container">
      <h1>Користувачі</h1>
      <div className="controls">
        <SearchBar query={query} setQuery={setQuery} />
        <SortSelect sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <button onClick={handleAddClick} className="add-user-btn">Додати користувача</button>
      </div>

      {isFormOpen && (
        <UserForm
          initialData={editingUser}
          onSave={handleSaveUser}
          onCancel={handleCancel}
        />
      )}

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      
      <div className="user-list">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={() => handleEditClick(user)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
