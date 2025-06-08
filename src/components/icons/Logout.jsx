import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Logout({ onCancel }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-semibold mb-8 text-[#16404D]">Log Out</h1>
            <p className="text-lg text-[#16404D] mb-8">Are you sure you want to log out?</p>
            <div className="flex space-x-4">
                <button
                    onClick={onCancel}
                    className="px-6 py-2 border border-[#DDA853] text-[#DDA853] rounded-[25px] hover:bg-[#DDA85333]"
                >
                    Cancel
                </button>
                <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-[#DDA853] text-white rounded-[25px] hover:bg-[#DDA853]/90"
                >
                    Confirm Logout
                </button>
            </div>
        </div>
    );
}