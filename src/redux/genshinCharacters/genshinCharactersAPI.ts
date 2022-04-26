import { SERVER_URL } from '../../constants';

export const fetchCharacters = () => {
  return fetch(`${SERVER_URL}characters/all`).then(response => response.json());
};
