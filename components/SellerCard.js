import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function SellerCard({ sellerObj }) {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{sellerObj.username}</Card.Title>
          <Card.Text>
            <p>Email: {sellerObj.email}</p>
            <p>Phone Number: {sellerObj.phoneNumber}</p>
          </Card.Text>
          <Link passHref href={`/users/${sellerObj.id}`}>
            <Button variant="danger">View Seller</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

SellerCard.propTypes = {
  sellerObj: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    uid: PropTypes.string,
    products: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.number,
      categoryId: PropTypes.number,
      sellerId: PropTypes.number,
    }),
  }).isRequired,
};
