import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCompletedOrdersByCustomer } from '../../controllers/orderData';
import OrderCard from '../../components/OrderCard';

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const ordersForCustomer = () => {
    getCompletedOrdersByCustomer(id)?.then(setOrders);
  };

  useEffect(() => {
    ordersForCustomer();
  }, []);

  console.warn(orders);

  return (
    <div>
      <h3>Viewing All Your Closed Orders:</h3>
      {orders?.map((order) => (
        <OrderCard key={order.id} orderObj={order} onUpdate={ordersForCustomer} />
      ))}
    </div>
  );
}
