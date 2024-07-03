import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('/api/characters');
        setCharacters(response.data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div>
      <h1>Characters</h1>
      <ul>
        {characters.map(character => (
          <li key={character.id}>{character.name} - {character.class}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;