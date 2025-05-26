import { useState } from 'react';

const ServiceCard = ({ title, description, image, category }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group bg-[#fff] flex flex-col items-center justify-center rounded-[25px] shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      
      <div className=" flex flex-col items-center justify-center pt-[20px] gap-[10px]">
        <div>
          <span className="text-[14px] font-medium text-blue-600 capitalize">{category}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
        
        <div className={`transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard; 