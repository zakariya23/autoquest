import React, { useState, useEffect } from 'react';
import './CarAutocomplete.css'

const Autocomplete = ({onCarSelect}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length > 0) {
      searchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const searchSuggestions = async (searchTerm) => {
    const searchTerms = searchTerm.split(' ');

    const where = searchTerms.map((term) => {
      const parsedTerm = parseInt(term, 10);
      const isNumber = !isNaN(parsedTerm);

      if (isNumber) {
        return { "Year": parsedTerm };
      } else {
        return {
          "$or": [
            { "Make": { "$regex": `^${term}`, "$options": "i" } },
            { "Model": { "$regex": `^${term}`, "$options": "i" } },
            { "Category": { "$regex": `^${term}`, "$options": "i" } },
          ],
        };
      }
    });

    const response = await fetch(`https://parseapi.back4app.com/classes/Car_Model_List?limit=10&where=${encodeURIComponent(JSON.stringify({ "$and": where }))}`, {
      headers: {
        'X-Parse-Application-Id': 'hlhoNKjOvEhqzcVAJ1lxjicJLZNVv36GdbboZj3Z',
        'X-Parse-Master-Key': 'SNMJJF0CZZhTPhLDIqGhTlUNV9r60M2Z5spyWfXW',
      },
    });
    const data = await response.json();
    setSuggestions(data.results);
  };





  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="autocomplete">
      <input type="text" value={query} onChange={handleInputChange} />
      <ul className="suggestions-list">
        {suggestions &&
          suggestions.map((suggestion) => (
            <li
              key={suggestion.objectId}
              onClick={() => {
                setQuery(`${suggestion.Make} ${suggestion.Model} ${suggestion.Year}`);
                setSuggestions([]);
                onCarSelect(suggestion); // Call the onCarSelect function passed as a prop
              }}
            >
              {suggestion.Make} {suggestion.Model} ({suggestion.Year}) - {suggestion.Category}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
