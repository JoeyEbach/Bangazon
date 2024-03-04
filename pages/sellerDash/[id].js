// total sales / total inventory by category / orders with products [closed and open]
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getOrdersBySeller } from '../../controllers/orderData';
import OrderCard from '../../components/OrderCard';

export default function SellerDash() {
  const [ordersOpen, setOrdersOpen] = useState([]);
  const [closedOrders, setClosedOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const getOrders = () => {
    getOrdersBySeller(id)?.then((orderList) => {
      orderList.forEach((order) => {
        if (order.closed) {
          setClosedOrders((prevState) => ([...prevState, order]));
          setTotalSales((p) => p + order.orderTotal);
        } else {
          setOrdersOpen((prevState) => ([...prevState, order]));
        }
      });
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <h3>Seller Dashboard</h3>
      <h4>Your Total Sales: ${totalSales}</h4>
      <h4>Open Orders</h4>
      {ordersOpen?.map((order) => (
        <OrderCard key={order.Id} orderObj={order} onUpdate={order} />
      ))}
      <h4>Closed Orders</h4>
      {closedOrders?.map((order) => (
        <OrderCard key={order.Id} orderObj={order} onUpdate={order} />
      ))}
    </div>
  );
}
