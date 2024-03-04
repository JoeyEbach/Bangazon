import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteOrderProduct, getCart, newOrderProduct } from '../controllers/orderData';
import { useAuth } from '../utils/context/authContext';

export default function ProductCard({ productObj }) {
  const [button, setButton] = useState(false);
  const { user } = useAuth();

  const checkCart = () => {
    getCart(user.id)?.then((order) => {
      order.products.forEach((product) => {
        if (product.id === productObj.id) {
          setButton(true);
        }
      });
    });
  };

  const addToCart = () => {
    getCart(user.id)?.then((order) => {
      const payload = { orderId: order.id, productId: productObj.id };
      newOrderProduct(payload).then(() => {
        checkCart();
      });
    });
  };

  const removeFromCart = () => {
    getCart(user.id)?.then((order) => {
      deleteOrderProduct(order.id, productObj.id).then(() => {
        setButton(false);
        checkCart();
      });
    });
  };

  useEffect(() => {
    checkCart();
  }, [user.id]);

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{productObj.title}</Card.Title>
          <Card.Text>
            <p>Price: {productObj.price} | Qty: {productObj.quantity}</p>
            <p>Description: {productObj.description}</p>
            <p>Found in {productObj.category.name}</p>
            <p>Sold By:</p>
            <Link passHref href={`/users/${productObj.sellerId}`}>{productObj.seller.username}</Link>
          </Card.Text>
          <Link passHref href={`/products/${productObj.id}`}>
            <Button variant="danger">View Product</Button>
          </Link>
          {button ? <Button variant="danger" onClick={removeFromCart}>Remove From Cart</Button> : <Button variant="danger" onClick={addToCart}>Add To Cart</Button>}
        </Card.Body>
      </Card>
    </div>
  );
}

ProductCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    categoryId: PropTypes.number,
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    sellerId: PropTypes.number,
    seller: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      email: PropTypes.string,
      phoneNumber: PropTypes.string,
    }),
  }).isRequired,
};
