import React from 'react';

const SortSelect = ({ sortOrder, setSortOrder }) => {
  return (
    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="sort-select">
      <option value="asc">Сортувати: A–Я</option>
      <option value="desc">Сортувати: Я–A</option>
    </select>
  );
};

export default SortSelect;
