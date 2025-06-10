import { useState } from 'react';
import { Link } from 'react-router-dom';
import cart from '../../assets/cart.svg';
import './shop.css';
import electrican from '../../assets/electrician-shop.svg';
import carpentary from '../../assets/carpentary.svg';
import painter from '../../assets/painter.svg';
import plumber from '../../assets/plumber.svg';


export default function Shop() {
    const [activeCategory, setActiveCategory] = useState('all');

    // Your previous nested data structure
    const product = {
        electrican: [
            { id: 1, title: 'Pipe Repair', description: 'Professional pipe repair services', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Pipe Repair' },
            { id: 2, title: 'Pipe Repair', description: 'Professional pipe repair services', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Pipe Repair' },
        ],
        Carpentry: [
            { id: 3, title: 'Electrical Repair', description: 'Professional electrical repair services', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Electrical Repair' },
            { id: 4, title: 'Wiring Installation', description: 'Safe and reliable wiring installation', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Wiring Installation' },
        ],
        Painter: [
            { id: 5, title: 'Home Renovation', description: 'Complete home renovation services', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Home Renovation' },
            { id: 6, title: 'Kitchen Remodel', description: 'Professional kitchen remodeling', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Kitchen Remodel' },
        ],
        Plumber: [
            { id: 7, title: 'Home Renovation', description: 'Complete home renovation services', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Home Renovation' },
            { id: 8, title: 'Kitchen Remodel', description: 'Professional kitchen remodeling', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Kitchen Remodel' },
        ],
    };

    // Filter categories derived from your previous data structure
    const categories = [
        { name: 'All Products', value: 'all'},
        { name: 'electrican', value: 'electrican', image: electrican },
        { name: 'Carpentry', value: 'Carpentry', image: carpentary },
        { name: 'Painter', value: 'Painter' , image : painter},
        { name: 'Plumber', value: 'Plumber', image : plumber },
    ];

    const getFilteredServices = () => {
        let filtered = [];

        if (activeCategory === 'all') {
            // Flatten all services from the nested structure
            Object.values(product).forEach(topCategory => {
                Object.values(topCategory).forEach(subCategory => {
                    filtered = filtered.concat(subCategory);
                });
            });
        } else if (product[activeCategory]) { // Check if it's a top-level category
            Object.values(product[activeCategory]).forEach(subCategory => {
                filtered = filtered.concat(subCategory);
            });
        } else { // It's a sub-category
            Object.values(product).forEach(topCategory => {
                if (topCategory[activeCategory]) {
                    filtered = filtered.concat(topCategory[activeCategory]);
                }
            });
        }
        return filtered;
    };

    const filteredServices = getFilteredServices();

    return (
        <div className="sm:px-6 lg:px-8 mb-[100px] mt-[3rem]">
            <div className="max-w-7xl mx-auto py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold mb-4">Our Shop</h1>
                    <p className="text-lg max-w-2xl mx-auto">From walls to wiring — we've got your finishing needs covered.</p>
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
                                        ? 'bg-[#DDA853] text-white shadow-md' 
                                        : 'bg-white border-2 border-gray-200 text-[#16404D] hover:border-[#DDA853] hover:text-[#DDA853]'
                                    }
                                `}
                                onClick={() => setActiveCategory(category.value)}
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
                                        <span className="font-medium">{category.name}</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2rem]">
                    {filteredServices.map(service => (
                        <div key={service.id} className="bg-white rounded-[25px] shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
                            <div className="relative w-full h-48">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6 pt-10">
                                <h3 className="text-[24px] font-semibold text-[#16404d] mb-2">{service.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                                <div className="flex justify-between items-center px-1">
                                    <p className="text-[#866734] mb-2 text-[20px]">150$</p>
                                    <div className="p-2 border-2 border-[#9C722C] rounded-full hover:bg-[#DDA853] hover:border-[#DDA853] group transition-colors cursor-pointer cart-container">
                                        <img className="cart w-6 h-6 group-hover:filter-dda853" src={cart} alt="Shopping cart icon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};