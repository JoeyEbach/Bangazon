import { useEffect, useState } from 'react';
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getProducts } from '../controllers/productData';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  const getAllProducts = () => {
    getProducts()?.then(setProducts);
  };

  useEffect(() => {
    getAllProducts();
  });

  return (
    <div>
      <h1>Hello {user.fbUser.displayName}!</h1>
      <h3>Viewing All products:</h3>
      {products.map((product) => (
        <ProductCard key={product.id} productObj={product} onUpdate={getAllProducts} />
      ))}
    </div>
  );
}

export default Home;
