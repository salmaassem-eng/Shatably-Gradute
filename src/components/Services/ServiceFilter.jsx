const ServiceFilter = ({ activeFilter, activeCategory, onFilterChange, onCategoryChange }) => {
  const filters = [
    { id: 'all', label: 'All Services' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'projects', label: 'Projects' },
  ];

  const categories = {
    maintenance: [
      { id: 'all', label: 'All Maintenance' },
      { id: 'electrical', label: 'Electrical' },
      { id: 'hvac', label: 'HVAC' },
    ],
    projects: [
      { id: 'all', label: 'All Projects' },
      { id: 'renovation', label: 'Renovation' },
      { id: 'construction', label: 'Construction' },
    ],
  };

  return (
    <div className="bg-[#fff] rounded-[25px] shadow p-[25px] mt-[75px] h-fit w-[230px] mb-8">
      <div className="flex flex-col gap-[5px]">
        {filters.map((filter) => (
          <div key={filter.id}>
            <button
              onClick={() => {
                if (activeFilter === filter.id) {
                  onFilterChange('all');
                  onCategoryChange('all');
                } else {
                  onFilterChange(filter.id);
                  onCategoryChange('all');
                }
              }}
              className={`text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 w-full bg-[#fff]
                ${activeFilter === filter.id ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-100'}
              `}
            >
              {filter.label}
            </button>
            {/* Show categories directly under the active main filter */}
            {activeFilter === filter.id && categories[filter.id] && (
              <div className="flex flex-col gap-1 mt-1 ml-4">
                {categories[filter.id].map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`text-left p-[10px] pl-[40px] rounded text-[14px] transition-all duration-200 bg-[#fff]
                      ${activeCategory === category.id ? 'text-blue-600 bg-blue-100 font-semibold' : 'text-gray-600 hover:bg-gray-100'}
                    `}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceFilter; 