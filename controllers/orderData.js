import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getOrder = (orderId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getOrdersBySeller = (sellerId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/orders/seller/${sellerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getCompletedOrdersByCustomer = (customerId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/orders/customer/${customerId}/completed`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const newOrderProduct = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/order/addProduct`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteOrderProduct = (orderId, productId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/order/${orderId}/deleteProduct/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

const getCart = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/cart/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const cartCheck = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/cart/new/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const closeCart = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/cart/close`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getOrder,
  getOrdersBySeller,
  getCompletedOrdersByCustomer,
  newOrderProduct,
  deleteOrderProduct,
  getCart,
  cartCheck,
  closeCart,
};
