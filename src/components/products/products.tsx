import React, { useEffect, useState } from 'react'; 
import { IProduct as ProductType } from '../../Interface/ProductsCard';
import { useTranslation } from 'next-i18next';
import { FaShoppingCart } from 'react-icons/fa'; 
import { IoPricetagOutline } from 'react-icons/io5';  
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addItem } from '../../redux/Slice/slice';

const categoryColors: Record<string, string> = {
  "electronics": "#fc94f6",
  "women's clothing": "#fc94f6"
};

const Product: React.FC<{ selectedCategory: string }> = ({ selectedCategory }) => {
  const { t } = useTranslation('common');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        const tokenValue = token ? token.split('=')[1] : null;
        console.log({tokenValue , token})

        if (!token) {
          throw new Error('El token no se encontrò en las cookies');
        }

        const response = await fetch('http://192.168.88.39:7000/auth/products', {
          headers: {
            'Authorization': `Bearer ${token}`,
        
          },
        });

        if (!response.ok) {
          throw new Error('Error al tratar de obtener los productos ');
        }

        const data: ProductType[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>{t('loading')}...</p>;
  if (error) return <p>{t('error', { message: error })}</p>;

  const filteredProducts = selectedCategory === 'all products' || selectedCategory === '' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (Product: ProductType) => {
    dispatch(addItem({ ...Product, quantity: 1 })); 
  };

  return (
    <ProductSection>
      <ProductTitle>{t('featuredProducts')}</ProductTitle> 
      <ProductList>
        {filteredProducts.length === 0 && (
          <p>{t('noProducts')}</p>
        )}
        {filteredProducts.map(product => (
          <ProductCard key={product.id} style={{ backgroundColor: categoryColors[product.category] }}>
            <ProductImageContainer>
              <ProductImage src={product.image} alt={product.title} />
            </ProductImageContainer>
            <ProductInfo>
              <ProductTitleCard>{product.title}</ProductTitleCard>
              <ProductPrice>
                ${product.price.toFixed(2)}
                <IoPricetagOutline size={16} /> 
              </ProductPrice>
              <AddToCartButton onClick={() => handleAddToCart(product)}>
                <FaShoppingCart size={16} />
                {t('addToCart')}
              </AddToCartButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductList>
    </ProductSection>
  );
};

export default Product;


const ProductSection = styled.section`
  padding: 2rem;
`;

const ProductTitle = styled.h2`
  font-size: 1.5rem;
  color: #540853;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: bold;
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const ProductCard = styled.div`
  background-color: #fc94f6;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  color: #333;
  padding: 1rem;
  font-size: 0.875rem; /* Reducir tamaño */
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  padding-top: 80%; /* Reducir tamaño */
`;

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  padding: 1rem 0;
  text-align: center;
`;

const ProductTitleCard = styled.h3`
  font-size: 1rem; 
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.p`
  font-size: 1rem; 
  font-weight: 700;
  color: #2b0029;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddToCartButton = styled.button`
  background-color: #7d0f7c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #540853;
  }
`;



