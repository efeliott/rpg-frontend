// src/components/inventory/InventoryForm.js

import React, { useState } from 'react';
import axios from 'axios';

const InventoryForm = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [characterId, setCharacterId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/characters', {
        item_name: itemName,
        quantity,
        character_id: characterId,
      });
      console.log('Inventory item created:', response.data);
      // Optionally clear the form or provide feedback to the user
    } catch (error) {
      console.error('Error creating inventory item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Item Name</label>
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
      </div>
      <div>
        <label>Quantity</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
      </div>
      <div>
        <label>Character ID</label>
        <input type="text" value={characterId} onChange={(e) => setCharacterId(e.target.value)} required />
      </div>
      <button type="submit">Create Inventory Item</button>
    </form>
  );
};

export default InventoryForm;