const api = 'https://reactnd-books-api.udacity.com';

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: 'application/json',
  Authorization: token
};

export const get = (/** @type {string} */ bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book);

/**
 * @return {Promise<Array<>>}
 */
export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then((res) => res.json())
    .then((data) => data.books);

/**
 * @return {Promise<>}
 */
export const update = (
  /** @type {string} */ bookId,
  /** @type {string} */ shelf
) =>
  fetch(`${api}/books/${bookId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then((res) => res.json());

/**
 * @return {Promise<Array<>>}
 */
export const search = (
  /** @type {string} */ query,
  /** @type {number} */ maxResults
) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  })
    .then((res) => res.json())
    .then((data) => data.books);
