import UserInfo from './UserInfo';

export default function UserForm({ formData, onSubmit, onChange, onDiscard }) {
    return (
        <form onSubmit={onSubmit}>
            <h1 className="text-2xl font-semibold mb-6 text-[#16404D]">Personal Information</h1>
            
            <div className="mb-6">
                <div className="grid grid-cols-2 gap-6">
                    <UserInfo 
                        label="First Name" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={onChange}
                    />
                    <UserInfo 
                        label="Last Name" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={onChange}
                    />
                </div>
            </div>

            <UserInfo 
                className="mb-6"
                label="Email" 
                name="email" 
                value={formData.email} 
                onChange={onChange}
            />

            <UserInfo 
                className="mb-6"
                label="Mobile Number" 
                name="phoneNumber" 
                value={formData.phoneNumber} 
                onChange={onChange}
            />
            
            <div className="flex justify-end space-x-4 mt-10">
                <button
                    type="button"
                    onClick={onDiscard}
                    className="px-6 py-2 border border-[#DDA853] text-[#DDA853] rounded-[25px] hover:bg-[#DDA85333]"
                >
                    Discard Changes
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-[#DDA853] text-white rounded-[25px] hover:bg-[#DDA853]/90"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
}
