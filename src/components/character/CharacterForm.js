import React, { useState } from 'react';
import axios from 'axios';

const CharacterForm = () => {
  const [name, setName] = useState('');
  const [charClass, setCharClass] = useState('');
  const [level, setLevel] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/characters', {
        name,
        class: charClass,
        level,
        user_id: userId,
      });
      console.log('Character created:', response.data);
      // Optionally clear the form or provide feedback to the user
    } catch (error) {
      console.error('Error creating character:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Class</label>
        <input type="text" value={charClass} onChange={(e) => setCharClass(e.target.value)} required />
      </div>
      <div>
        <label>Level</label>
        <input type="number" value={level} onChange={(e) => setLevel(e.target.value)} required />
      </div>
      <div>
        <label>User ID</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
      </div>
      <button type="submit">Create Character</button>
    </form>
  );
};

export default CharacterForm;
