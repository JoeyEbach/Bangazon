import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getCart } from '../../controllers/orderData';
import { useAuth } from '../../utils/context/authContext';
import ProductCard from '../../components/ProductCard';

export default function Cart() {
  const [order, setOrder] = useState({});
  const { user } = useAuth();

  const userCart = () => {
    getCart(user.id)?.then(setOrder);
  };

  useEffect(() => {
    userCart();
  });

  return (
    <div>
      <h3>Viewing Your Shopping Cart</h3>
      <h5>Here Are The Products In Order# {order.id}:</h5>
      <h5>Order Total: ${order.orderTotal}</h5>
      {order.products ? order.products?.map((product) => (
        <ProductCard key={product.id} productObj={product} onUpdate={product} />
      )) : <p>There are no items in your cart yet!</p>}
      <Button type="click" variant="danger">Checkout</Button>
    </div>
  );
}
