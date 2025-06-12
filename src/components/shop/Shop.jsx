import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import cart from '../../assets/cart.svg';
import './shop.css';
import electrican from '../../assets/electrician-shop.svg';
import carpentary from '../../assets/carpentary.svg';
import painter from '../../assets/painter.svg';
import plumber from '../../assets/plumber.svg';
import HammerLoading from '../Shared/HammerLoading';

export default function Shop() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9; // Number of items per page

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                // Construct query parameters
                const queryParams = new URLSearchParams({
                    pageIndex: currentPage,
                    PageSize: pageSize,
                    category: activeCategory !== 'all' ? activeCategory : ''
                });

                const response = await fetch(`https://shatably.runasp.net/api/Products?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch Product data: ${response.status}`);
                }

                const data = await response.json();
                console.log('Raw API Response:', data);

                // Handle both array and object responses
                let productsArray = [];
                if (Array.isArray(data)) {
                    productsArray = data;
                } else if (typeof data === 'object' && data !== null) {
                    if (data.data && Array.isArray(data.data)) {
                        productsArray = data.data;
                    } else {
                        productsArray = [data];
                    }
                }

                // Ensure each product has all required fields
                const processedProducts = productsArray.map(product => ({
                    productId: product.productId || Math.random().toString(36).substr(2, 9),
                    name: product.name || 'Unnamed Product',
                    details: product.details || 'No description available',
                    price: product.price || 0,
                    imageUrl: product.imageUrl || 'https://via.placeholder.com/300x200',
                    category: product.category || 'uncategorized'
                }));

                setProducts(processedProducts);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [currentPage, activeCategory]); // Dependencies for re-fetching

    const categories = [
        { name: 'All Products', value: 'all' },
        { name: 'Electrician', value: 'Electrician', image: electrican },
        { name: 'Carpentry', value: 'Carpentry', image: carpentary },
        { name: 'Painter', value: 'Painter', image: painter },
        { name: 'Plumber', value: 'Plumber', image: plumber },
    ];

    // Handle category change
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCurrentPage(1); // Reset to first page when changing category
    };

    if (loading) {
        return <HammerLoading />;
    }

    if (error) {
        return <div className="text-center py-12 text-red-600">Error: {error}</div>;
    }

    return (
        <div className="sm:px-6 lg:px-8 mb-[100px] mt-[3rem]">
            <div className="max-w-7xl mx-auto py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold mb-4">Our Shop</h1>
                    <p className="text-[1rem] max-w-2xl mx-auto">From walls to wiring — we've got your finishing needs covered.</p>
                </div>

                {/* Filter Section */}
                <div className="mb-12">
                    <h2 className="text-[#16404D] text-2xl font-semibold mb-6">Shop by categories</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.value}
                                className={`
                                    relative overflow-hidden rounded-[30px] transition-all duration-200 p-0 m-0
                                    ${activeCategory === category.value 
                                        ? 'border-[#DDA853] bg-[#fad8a0] border-[2px] shadow-md' 
                                        : ' border-2 border-[#DDA853] text-[#16404D] hover:border-[#DDA853] hover:text-[#DDA853]'
                                    }
                                `}
                                onClick={() => handleCategoryChange(category.value)}
                            >
                                <div className="flex flex-col">
                                    {category.image && (
                                        <div className="w-full h-48 overflow-hidden">
                                            <img 
                                                src={category.image} 
                                                alt={category.name} 
                                                className="w-full h-full object-cover p-0 m-0"
                                            />
                                        </div>
                                    )}
                                    <div className="p-3">
                                        {category.value === 'all' ? (
                                            <span className="text-[1.55rem] font-bold">{category.name}</span>
                                        ) : (
                                            <span className="text-[1.15rem]">{category.name}</span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2rem]">
                    {products.length > 0 ? (
                        products.map(product => (
                            <div key={product.productId} className="bg-white rounded-[25px] shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
                                <div className="relative w-full h-48">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300x200';
                                        }}
                                    />
                                </div>
                                <div className="p-6 pt-10">
                                    <h3 className="text-[24px] font-semibold text-[#16404d] mb-2">{product.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{product.details}</p>
                                    <div className="flex justify-between items-center px-1">
                                        <p className="text-[#866734] mb-2 text-[20px]">${product.price}</p>
                                        <div className="p-2 border-2 border-[#9C722C] rounded-full hover:bg-[#DDA853] hover:border-[#DDA853] group transition-colors cursor-pointer cart-container">
                                            <img className="cart w-6 h-6 group-hover:filter-dda853" src={cart} alt="Shopping cart icon" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8 text-gray-500">
                            No products found
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center gap-2">
                    {[1, 2, 3].map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`px-4 py-2 rounded-lg ${
                                currentPage === pageNumber
                                    ? 'bg-[#DDA853] text-white'
                                    : 'bg-white border border-gray-300 text-gray-700 hover:border-[#DDA853]'
                            }`}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};