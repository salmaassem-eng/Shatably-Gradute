export default function BookingSummary({ bookingData, formData, type }) {
    const calculateTotal = () => {
        if (!bookingData || !bookingData.price || !formData.duration) return 0;
        return bookingData.price * parseInt(formData.duration);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    if (!bookingData) return null;

    return (
        <div className="space-y-6">
            {/* Large Image and Title Section */}
            <div className="relative">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                    <img
                        src={bookingData.profilePhotoUrl || bookingData.mainImageURL}
                        alt={type === 'worker' ? bookingData.fullName : bookingData.title}
                        className="w-full h-[22rem] object-cover object-top rounded-[25px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-gray-400/30  opacity-80 rounded-[25px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 rounded-b-[25px]">
                    <h2 className="text-2xl font-bold text-white">
                        {type === 'worker' ? bookingData.fullName : bookingData.title}
                    </h2>
                    <p className="text-white/90 text-sm">
                        {type === 'worker' ? bookingData.type : type === 'service' ? 'Service' : 'Project'}
                    </p>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Date</span>
                        <span className="font-medium">{formatDate(formData.date)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Time</span>
                        <span className="font-medium">{formatTime(formData.time)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium">{formData.duration} {parseInt(formData.duration) === 1 ? 'hour' : 'hours'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Price per hour</span>
                        <span className="font-medium">{bookingData.price} EGP</span>
                    </div>
                </div>

                <div className="border-t border-gray-200 my-4 pt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-900">Total</span>
                        <span className="text-xl font-bold text-[#16404D]">{calculateTotal()} EGP</span>
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Service Location</h4>
                    <p className="text-sm text-gray-600">{formData.address}</p>
                </div>

                {formData.notes && (
                    <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Additional Notes</h4>
                        <p className="text-sm text-gray-600">{formData.notes}</p>
                    </div>
                )}
            </div>
        </div>
    );
} 