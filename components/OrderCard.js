/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getSingleUser } from '../controllers/userData';

export default function OrderCard({ orderObj }) {
  const [customer, setCustomer] = useState({});

  const getCustomer = () => {
    getSingleUser(orderObj.customerId).then(setCustomer);
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>#{orderObj.id} {customer.userName}</Card.Title>
          <Card.Text>
            <p>Date: {orderObj.dateCreated}</p>
            <p>Shipping: {orderObj.shipping ? 'Yes' : 'No'}</p>
            <p>Payment Type: {orderObj.paymentType}</p>
            <p>Closed: {orderObj.closed ? 'Yes' : 'No'}</p>
            <h4>Products In Order:</h4>
            <p>{orderObj.products.map((product) => (
              <div key={product.Id}>
                <Link passHref href={`/products/${product.id}`}>
                  <a>{product.title} - ${product.price}</a>
                </Link>
              </div>
            ))}
            </p>
            <h3>Order Total: {orderObj.orderTotal}</h3>
          </Card.Text>
          <Link passHref href={`/order/${orderObj.id}`}>
            <Button variant="danger">View Order</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    customerId: PropTypes.number,
    id: PropTypes.number,
    paymentType: PropTypes.string,
    dateCreated: PropTypes.string,
    shipping: PropTypes.bool,
    closed: PropTypes.bool,
    orderTotal: PropTypes.number,
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.number,
      categoryId: PropTypes.number,
      sellerId: PropTypes.number,
      seller: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        email: PropTypes.string,
        phoneNumber: PropTypes.string,
      }),
    })).isRequired,
  }).isRequired,
};
