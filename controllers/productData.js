import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getProducts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getProductBySeller = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products/seller/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getProductsSoldBySeller = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products/sold/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getTwentyProducts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products/first20`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const searchProducts = (userInput) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products/search/${userInput}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getProducts,
  getSingleProduct,
  getProductBySeller,
  getProductsSoldBySeller,
  getTwentyProducts,
  searchProducts,
};
