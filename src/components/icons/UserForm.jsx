import UserInfo from './UserInfo';
// import { toast } from 'react-toastify';

export default function UserForm({ formData, initialFormData, onSubmit, onChange, onDiscard }) {
    // Handler for Save
    const isChanged = JSON.stringify(formData) !== JSON.stringify(initialFormData);

        // const confirmed = window.confirm('Are you sure you want to save changes?');
        // if (!confirmed) return;
        //     try {
        //         const safeAddress = formData.address || { city: '', region: '', street: '' };
        //         const dataToSend = {
        //             ...formData,
        //             address: safeAddress
        //         };
        //         const result =await onSubmit(dataToSend); 
        //         if (result?.success) {
        //             toast.success('Changes saved successfully!', { icon: '✅' });
        //         } else {
        //             toast.error('Failed to save changes.', { icon: '❌' });
        //         }
        //     } catch {
        //         toast.error('Failed to save changes.', { icon: '❌' });
        //     }
        // }
    

    // Handler for Discard
    // const handleDiscard = (e) => {
    //     e.preventDefault();
    //     if (!isChanged) {
    //         toast.info('No changes to discard.', {
    //             position: "top-right",
    //             autoClose: 2000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //         });
    //         return;
    //     }

    //     const confirmed = window.confirm('Are you sure you want to discard changes?');
    //     if (confirmed) {
    //         onDiscard(e);
    //         toast.success('Changes discarded.', { icon: '✅' });
    //     }
    // };



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
                type="email"
                value={formData.email} 
                onChange={onChange}
            />

            {/* <UserInfo 
                className="mb-6"
                label="address" 
                name="address" 
                value={formData.address} 
                onChange={onChange}
                placeholder='city , region , street'
            /> */}
            <div className="mb-6">
                <div className="grid grid-cols-3 gap-4">
                    <UserInfo 
                        label="City" 
                        name="city" 
                        value={formData.address?.city || ''} 
                        onChange={onChange}
                        placeholder="City"
                    />
                    <UserInfo 
                        label="Region" 
                        name="region" 
                        value={formData.address?.region || ''} 
                        onChange={onChange}
                        placeholder="Region"
                    />
                    <UserInfo 
                        label="Street" 
                        name="street" 
                        value={formData.address?.street || ''} 
                        onChange={onChange}
                        placeholder="Street"
                    />
                </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-10">
                <button
                    type="button"
                    onClick={onDiscard}
                    className="px-6 py-2 border border-[#DDA853] text-[#DDA853] rounded-[25px] hover:bg-[#DDA85333]"
                    disabled={!isChanged}
                >
                    Discard Changes
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-[#16404D] text-white rounded-[25px] hover:bg-[#16404D]/90"
                    disabled={!isChanged}
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
}
