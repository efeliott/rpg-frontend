import axios from 'axios';

export const fetchInventories = () => {
  return (dispatch) => {
    axios.get('/api/inventories')
      .then(response => {
        dispatch({ type: 'FETCH_INVENTORIES_SUCCESS', payload: response.data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_INVENTORIES_FAILURE', payload: error });
      });
  };
};
