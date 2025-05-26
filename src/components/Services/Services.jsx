import { useState } from 'react';
import ServiceCard from './ServiceCard';
import ServiceFilter from './ServiceFilter';

const Services = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');

  // Sample data structure - you can replace this with your actual data
  const services = {
    small: {
      plumber: [
        { id: 1, title: 'Pipe Repair', description: 'Professional pipe repair services', image: '/plumber1.jpg' },
        { id: 2, title: 'Leak Detection', description: 'Advanced leak detection and repair', image: '/plumber2.jpg' },
      ],
      carpenter: [
        { id: 3, title: 'Furniture Repair', description: 'Expert furniture repair services', image: '/carpenter1.jpg' },
        { id: 4, title: 'Custom Woodwork', description: 'Custom woodworking solutions', image: '/carpenter2.jpg' },
      ],
    },
    maintenance: {
      electrical: [
        { id: 5, title: 'Electrical Repair', description: 'Professional electrical repair services', image: '/electrical1.jpg' },
        { id: 6, title: 'Wiring Installation', description: 'Safe and reliable wiring installation', image: '/electrical2.jpg' },
      ],
      hvac: [
        { id: 7, title: 'AC Maintenance', description: 'Regular AC maintenance services', image: '/hvac1.jpg' },
        { id: 8, title: 'Heating Repair', description: 'Expert heating system repair', image: '/hvac2.jpg' },
      ],
    },
    projects: {
      renovation: [
        { id: 9, title: 'Home Renovation', description: 'Complete home renovation services', image: '/renovation1.jpg' },
        { id: 10, title: 'Kitchen Remodel', description: 'Professional kitchen remodeling', image: '/renovation2.jpg' },
      ],
      construction: [
        { id: 11, title: 'New Construction', description: 'Custom home construction services', image: '/construction1.jpg' },
        { id: 12, title: 'Building Extension', description: 'Professional building extension services', image: '/construction2.jpg' },
      ],
    },
  };

  const getFilteredServices = () => {
    if (activeFilter === 'all') {
      return services;
    }
    
    if (activeCategory === 'all') {
      return { [activeFilter]: services[activeFilter] };
    }
    
    return {
      [activeFilter]: {
        [activeCategory]: services[activeFilter][activeCategory]
      }
    };
  };

  const filteredServices = getFilteredServices();

  // Helper for Learn More click
  const handleLearnMore = (filterType) => {
    setActiveFilter(filterType);
    setActiveCategory('all');
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-[50px] sm:px-6 lg:px-8 mb-[100px]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-lg text-gray-600">Find the perfect service for your needs</p>
        </div>

        <div className="flex flex-row gap-[2rem]">
          <ServiceFilter
            activeFilter={activeFilter}
            activeCategory={activeCategory}
            onFilterChange={setActiveFilter}
            onCategoryChange={setActiveCategory}
          />

          <div className="flex-1">
            <div className="space-y-16">
              {Object.entries(filteredServices).map(([filterType, categories]) => (
                <div key={filterType} className="space-y-8">
                  <div className="flex items-center justify-between mb-[20px]">
                    <h2 className="text-2xl font-semibold text-gray-900 capitalize">
                      {filterType} Services
                    </h2>
                    {/* Show Learn More only in All Services view */}
                    {activeFilter === 'all' && (
                      <button
                        className="text-sm hover:underline hover:border-none cursor-pointer bg-[#F0F0F0] p-[10px]"
                        onClick={() => handleLearnMore(filterType)}
                      >
                        Learn More →
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                    {Object.entries(categories).map(([category, items]) => (
                      items.map((service) => (
                        <ServiceCard
                          key={service.id}
                          title={service.title}
                          description={service.description}
                          image={service.image}
                          category={category}
                        />
                      ))
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services; 