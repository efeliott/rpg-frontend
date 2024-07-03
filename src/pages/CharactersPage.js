import React from 'react';
import CharacterList from '../components/character/CharacterList';
import CharacterForm from '../components/character/CharacterForm';

const CharactersPage = () => {
  return (
    <div>
      <h1>Characters</h1>
      <CharacterForm />
      <CharacterList />
    </div>
  );
};

export default CharactersPage;
