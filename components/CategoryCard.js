/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function CategoryCard({ categoryObj }) {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{categoryObj.name}</Card.Title>
          <Card.Text>
            <p>{categoryObj.products.map((product) => (
              <div key={product.id}>
                <Link passHref href={`/products/${product.id}`}>
                  <a>{product.title} - ${product.price}</a>
                </Link>
              </div>
            ))}
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    products: PropTypes.shape,
  }).isRequired,
};
