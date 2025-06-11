import { useState, useEffect } from 'react';
// import ServiceFilter from './ServiceFilter'; // Will be removed or replaced
import { Link } from 'react-router-dom';
import SmallServiceCards from './SmallServiceCards'; // Import the new component

// Import icons for maintenance and projects
import maintenanceIcon from '../../assets/maintainence work.svg';
import projectIcon from '../../assets/serviceProject.svg';


const Services = () => {
  const [allDisplayableItems, setAllDisplayableItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        // Only fetch Services (for maintenance) and Projects
        const [servicesResponse, projectsResponse] = await Promise.all([
          fetch('https://shatably.runasp.net/api/Services'),
          fetch('https://shatably.runasp.net/api/Projects'),
        ]);

        if (!servicesResponse.ok) throw new Error(`HTTP error! status: ${servicesResponse.status} from Services`);
        if (!projectsResponse.ok) throw new Error(`HTTP error! status: ${projectsResponse.status} from Projects`);

        const servicesData = await servicesResponse.json();
        // console.log('Fetched servicesData:', servicesData); // Removed previous log
        const projectsData = await projectsResponse.json();

        const transformedData = [];

        // Define keywords for categorizing services
        // (These are now only for distinguishing maintenance from what *would* be small services if they were dynamic)
        const smallServiceKeywords = {
          plumber: ['plumber', 'pipe', 'leak'],
          carpenter: ['carpenter', 'woodwork', 'furniture'],
          electrician: ['electrician', 'electrical', 'wiring'],
          painter: ['painter', 'painting', 'color'],
          cleaning: ['cleaning', 'housekeeping'],
        };

        // Helper to determine service category based on keywords
        const getServiceCategory = (name, details) => {
          const lowerName = name.toLowerCase();
          const lowerDetails = details.toLowerCase();
          for (const key in smallServiceKeywords) {
            if (smallServiceKeywords[key].some(keyword => lowerName.includes(keyword) || lowerDetails.includes(keyword))) {
              return key; // e.g., 'plumber'
            }
          }
          return 'maintenance'; // Default for services not matched as small projects
        };

        // Transform Services data (now only adding 'maintenance' type services from API)
        (Array.isArray(servicesData) ? servicesData : []).forEach(service => {
            const serviceCategory = getServiceCategory(service.name, service.details);
            console.log(`Service: ${service.name}, Category: ${serviceCategory}`);
            // Only add services categorized as 'maintenance' to the main displayable items
            if (serviceCategory === 'maintenance') {
                transformedData.push({
                    id: `s-${service.serviceId}`,
                    mainType: 'maintenance',
                    subType: 'maintenance',
                    name: service.name,
                    details: service.details,
                    imageUrl: service.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image',
                    price: service.price,
                    averageRating: service.averageRating,
                    reviewCount: service.reviewCount,
                    linkTo: `/service-details/${service.serviceId}`,
                    iconUrl: maintenanceIcon, // Add maintenance icon
                });
            }
        });

        // Transform Projects data
        (Array.isArray(projectsData) ? projectsData : []).forEach(project => {
          transformedData.push({
            id: `p-${project.projectId}`,
            mainType: 'project',
            name: project.title,
            details: project.description,
            imageUrl: project.mainImageURL || 'https://via.placeholder.com/300x200?text=No+Image',
            price: project.price,
            createdDate: project.createdDate,
            linkTo: `/project-item-details/${project.projectId}`,
            iconUrl: projectIcon, // Add project icon
          });
        });

        console.log('Transformed Data before setting state:', transformedData); // Add this new log
        setAllDisplayableItems(transformedData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Maintenance', value: 'maintenance' }, // Only dynamic services from API
    { name: 'Projects', value: 'project' },
  ];

  const getFilteredItems = () => {
    if (activeCategory === 'all') {
      return allDisplayableItems;
    } else {
      return allDisplayableItems.filter(item => item.mainType === activeCategory);
    }
  };

  const filteredItems = getFilteredItems();
  console.log('Filtered Items for rendering:', filteredItems);

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="sm:px-6 lg:px-8 mb-[100px] mt-[3rem]">
      <div className=" max-w-7xl mx-auto">
        <div className="text-center mb-5">
          <h1 className="text-4xl font-extrabold">Our Services</h1>
          <p className="text-[1rem] max-w-2xl mx-auto">Explore our services, projects, and skilled workers.</p>
        </div>
    <div className='flex flex-col gap-[5rem]'>
        <SmallServiceCards/> {/* Render the new component here */}

      <div>
        <h2 className="text-3xl font-bold mb-8 text-center text-[#16404D]">Full Services</h2>
        {/* Filter Section */}
        <div className="flex flex-wrap justify-center gap-x-6 mb-12 text-sm font-medium">
          {categories.map((category) => (
            <button
              key={category.value}
              className={`px-4 py-2 relative transition-colors duration-200 ${activeCategory === category.value ? 'text-[#16404D]' : 'text-[#16404D] opacity-60'}`}
              onClick={() => setActiveCategory(category.value)}
            >
              {category.name}
              {category.value !== categories[categories.length - 1].value && (
                <span className="absolute right-[-12px] top-1/2 -translate-y-1/2 h-4 w-px bg-gray-300"></span>
              )}
            </button>
          ))}
        </div>

        {/* Items Grid (for maintenance services and projects) */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2rem] justify-items-center">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-[25px] mb-5 w-[22rem] shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <div className="relative w-full h-48">
                <img 
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.iconUrl && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow-md">
                    <img src={item.iconUrl} alt={`${item.mainType} icon`} className="w-8 h-8" /> 
                  </div>
                )}
              </div>
              <div className="p-6 pt-10 flex flex-col text-center items-center ">
                <h3 className="text-xl font-semibold mb-2 capitalize">{item.name}</h3>
                <p className="text-sm mb-4 ">{item.details}</p>
                <Link 
                  to={item.linkTo} 
                  className="mt-auto px-6 py-2 bg-[#16404D] text-white rounded-[25px] hover:bg-[#16404D]/90 hover:text-white text-sm font-medium"
                  >
                  View {item.mainType.charAt(0).toUpperCase() + item.mainType.slice(1).replace('-', ' ')}
                </Link>
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