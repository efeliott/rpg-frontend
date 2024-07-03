import axios from 'axios';

export const fetchCharacters = () => {
  return (dispatch) => {
    axios.get('/api/characters')
      .then(response => {
        dispatch({ type: 'FETCH_CHARACTERS_SUCCESS', payload: response.data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_CHARACTERS_FAILURE', payload: error });
      });
  };
};
