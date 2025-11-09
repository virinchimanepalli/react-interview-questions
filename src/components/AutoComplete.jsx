import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './style.css';

export default function Autocomplete({ onSelectItem }) {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(
    _.debounce(async (q) => {
      if (!q) return;
      setLoading(true);
      try {
        // Rick & Morty search API
        const response = await axios.get(
          'https://rickandmortyapi.com/api/character',
          {
            params: { name: q },
          }
        );
        // just return name list
        const list = (response.data.results || []).map((c) => c.name);

        setItems(list);
      } catch (err) {
        setItems([]);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (query.trim()) {
      fetchItems(query);
    } else {
      setItems([]);
    }
  }, [query, fetchItems]);

  const handleSelect = (item) => {
    setQuery(item);
    setItems([]);
    if (onSelectItem) onSelectItem(item);
  };

  return (
    <div className="wrapper">
      <div className={`control ${loading ? 'is-loading' : ''}`}>
        <input
          type="text"
          className="input"
          value={query}
          placeholder="Type to search..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {items.length > 0 && !loading && (
        <div className="list is-hoverable">
          {items.map((item) => (
            <a
              key={item}
              className="list-item"
              onClick={() => handleSelect(item)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
