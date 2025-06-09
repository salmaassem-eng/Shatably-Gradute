import { useState } from 'react';
// import ServiceFilter from './ServiceFilter'; // Will be removed or replaced
import { Link } from 'react-router-dom';


const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Your previous nested data structure
  const services = {
    small: {
      plumber: [
        { id: 1, title: 'Pipe Repair', description: 'Professional pipe repair services', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Pipe Repair'},
        { id: 2, title: 'Leak Detection', description: 'Advanced leak detection and repair', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Leak Detection' },
      ],
      carpenter: [
        { id: 3, title: 'Furniture Repair', description: 'Expert furniture repair services', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Furniture Repair'},
        { id: 4, title: 'Custom Woodwork', description: 'Custom woodworking solutions', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Custom Woodwork' },
      ],
    },
    maintenance: {
      electrical: [
        { id: 5, title: 'Electrical Repair', description: 'Professional electrical repair services', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Electrical Repair'},
        { id: 6, title: 'Wiring Installation', description: 'Safe and reliable wiring installation', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Wiring Installation'},
      ],
      hvac: [
        { id: 7, title: 'AC Maintenance', description: 'Regular AC maintenance services', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=AC Maintenance' },
        { id: 8, title: 'Heating Repair', description: 'Expert heating system repair', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Heating Repair' },
      ],
    },
    projects: {
      renovation: [
        { id: 9, title: 'Home Renovation', description: 'Complete home renovation services', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Home Renovation' },
        { id: 10, title: 'Kitchen Remodel', description: 'Professional kitchen remodeling', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Kitchen Remodel' },
      ],
      construction: [
        { id: 11, title: 'New Construction', description: 'Custom home construction services', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=New Construction' },
        { id: 12, title: 'Building Extension', description: 'Professional building extension services', image: 'https://via.placeholder.com/300x200/ADD8E6/808080?text=Building Extension' },
      ],
    },
  };

  // Filter categories derived from your previous data structure
  const categories = [
    { name: 'All Services', value: 'all' },
    { name: 'Small Projects', value: 'small' },
    { name: 'Plumber', value: 'plumber' },
    { name: 'Carpenter', value: 'carpenter' },
    { name: 'Maintenance', value: 'maintenance' },
    { name: 'Electrical', value: 'electrical' },
    { name: 'HVAC', value: 'hvac' },
    { name: 'Big Projects', value: 'projects' },
    { name: 'Renovation', value: 'renovation' },
    { name: 'Construction', value: 'construction' },
  ];

  const getFilteredServices = () => {
    let filtered = [];

    if (activeCategory === 'all') {
      // Flatten all services from the nested structure
      Object.values(services).forEach(topCategory => {
        Object.values(topCategory).forEach(subCategory => {
          filtered = filtered.concat(subCategory);
        });
      });
    } else if (services[activeCategory]) { // Check if it's a top-level category
      Object.values(services[activeCategory]).forEach(subCategory => {
        filtered = filtered.concat(subCategory);
      });
    } else { // It's a sub-category
      Object.values(services).forEach(topCategory => {
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
          <h1 className="text-4xl font-extrabold mb-4">Our Services</h1>
          <p className="text-lg  max-w-2xl mx-auto">From walls to wiring — we’ve got your finishing needs covered.</p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap justify-center gap-x-6 mb-12 text-sm font-medium">
          {categories.map((category) => (
            <button
              key={category.value}
              className={`px-4 py-2 relative transition-colors duration-200 ${activeCategory === category.value ? 'text-blue-600' : 'hover:text-blue-500'}`}
              onClick={() => setActiveCategory(category.value)}
            >
              {category.name}
              {/* Vertical divider */}
              {category.value !== categories[categories.length - 1].value && (
                <span className="absolute right-[-12px] top-1/2 -translate-y-1/2 h-4 w-px bg-gray-300"></span>
              )}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2rem]">
          {filteredServices.map(service => (
            <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <div className="relative w-full h-48">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                {/* <div className="absolute -bottom-6 left-4 bg-white p-3 rounded-full shadow-md">
                  <img src={service.icon} alt="Service Icon" className="w-8 h-8 text-blue-600" /> 
                </div> */}
              </div>
              <div className="p-6 pt-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <Link 
                  to={`/services/${service.id}`} 
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  View Service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services; 