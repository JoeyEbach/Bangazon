import { useEffect, useState } from 'react';
// import { signOut } from '../utils/auth';
import SellerCard from '../components/SellerCard';
import { getUserSellers } from '../controllers/userData';

function Sellers() {
  const [sellers, setSellers] = useState([]);

  const getAllSellers = () => {
    getUserSellers()?.then(setSellers);
  };

  useEffect(() => {
    getAllSellers();
  });

  return (
    <div>
      <h3>Viewing All Sellers:</h3>
      {sellers?.map((seller) => (
        <SellerCard key={seller.Id} sellerObj={seller} onUpdate={getAllSellers} />
      ))}
    </div>
  );
}

export default Sellers;
