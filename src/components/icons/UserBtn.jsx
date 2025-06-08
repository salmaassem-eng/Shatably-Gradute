export default function UserBtn({children, isActive, onClick}) {
    return (
        <button 
            onClick={onClick}
            className={`w-full py-2 px-4 text-left rounded-[25px] border-none ${
                isActive 
                ? 'bg-[#DDA85333] text-[#DDA853] font-medium' 
                : 'text-[#16404D] hover:bg-gray-50' 
            }`}
        >
            {children}
        </button>
    )
}