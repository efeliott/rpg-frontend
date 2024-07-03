import React from 'react';
import InventoryList from '../components/inventory/InventoryList';
import InventoryForm from '../components/inventory/InventoryForm';

const InventoriesPage = () => {
  return (
    <div>
      <h1>Inventories</h1>
      <InventoryForm />
      <InventoryList />
    </div>
  );
};

export default InventoriesPage;
