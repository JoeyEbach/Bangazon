import { useEffect, useState } from 'react';
// import { signOut } from '../utils/auth';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getTwentyProducts } from '../controllers/productData';
import ProductCard from '../components/ProductCard';
import UserForm from '../components/forms/UserForm';
import { getSingleUser } from '../controllers/userData';

function Home() {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getSingleUser(user.id).then(setCurrentUser);
    getTwentyProducts()?.then(setProducts);
  }, [user]);

  const onUpdate = () => {
    router.reload();
    getSingleUser(user.id).then(setCurrentUser);
    getTwentyProducts()?.then(setProducts);
  };

  return (
    <> {currentUser === null ? (<UserForm onUpdate={onUpdate} />) : (
      <div>
        <h1>Hello {user.fbUser.displayName}!</h1>
        <h3>Check out our latest products:</h3>
        {products.map((product) => (
          <ProductCard key={product.id} productObj={product} />
        ))}
      </div>
    )}
    </>
  );
}

export default Home;
