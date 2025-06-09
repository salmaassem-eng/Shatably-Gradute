export default function UserBtn({children, onClick, className}) {
    return (
        <button 
            onClick={onClick}
            className={className}
            // className={`w-full py-2 px-4 text-left rounded-[25px] border-none ${
            //     isActive 
            //     ? 'bg-[#16404d] text-[#ffffff] font-medium' 
            //     : 'text-[#16404D] hover:bg-gray-50' 
            // }`}
        >
            {children}
        </button>
    )
}