import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InventoryList = () => {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.get('/api/inventories');
        setInventories(response.data);
      } catch (error) {
        console.error('Error fetching inventories:', error);
      }
    };

    fetchInventories();
  }, []);

  return (
    <div>
      <h1>Inventories</h1>
      <ul>
        {inventories.map(inventory => (
          <li key={inventory.id}>{inventory.item_name} - {inventory.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;