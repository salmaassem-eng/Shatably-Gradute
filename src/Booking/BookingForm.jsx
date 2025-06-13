import { useState } from 'react';

export default function BookingForm({ formData, setFormData, onSubmit}) {
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.time) newErrors.time = 'Time is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.contactName) newErrors.contactName = 'Name is required';
        if (!formData.contactPhone) newErrors.contactPhone = 'Phone number is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(e);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Preferred Date
                </label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#16404D] focus:ring-[#16404D] sm:text-sm ${
                        errors.date ? 'border-red-500' : ''
                    }`}
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>

            <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                    Preferred Time
                </label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#16404D] focus:ring-[#16404D] sm:text-sm ${
                        errors.time ? 'border-red-500' : ''
                    }`}
                />
                {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
            </div>

            <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Duration (hours)
                </label>
                <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#16404D] focus:ring-[#16404D] sm:text-sm"
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(hour => (
                        <option key={hour} value={hour}>{hour} {hour === 1 ? 'hour' : 'hours'}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Service Address
                </label>
                <textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#16404D] focus:ring-[#16404D] sm:text-sm ${
                        errors.address ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter the complete address where the service will be performed"
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                    Contact Name
                </label>
                <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#16404D] focus:ring-[#16404D] sm:text-sm ${
                        errors.contactName ? 'border-red-500' : ''
                    }`}
                />
                {errors.contactName && <p className="mt-1 text-sm text-red-600">{errors.contactName}</p>}
            </div>

            <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                    Contact Phone
                </label>
                <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#16404D] focus:ring-[#16404D] sm:text-sm ${
                        errors.contactPhone ? 'border-red-500' : ''
                    }`}
                />
                {errors.contactPhone && <p className="mt-1 text-sm text-red-600">{errors.contactPhone}</p>}
            </div>

            <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Additional Notes
                </label>
                <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#16404D] focus:ring-[#16404D] sm:text-sm"
                    placeholder="Any additional information or special requirements"
                />
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#16404D] hover:bg-[#16404D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16404D]"
                >
                    Confirm Booking
                </button>
            </div>
        </form>
    );
} 