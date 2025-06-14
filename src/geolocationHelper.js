export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        const storedLatitude = sessionStorage.getItem('userLatitude');
        const storedLongitude = sessionStorage.getItem('userLongitude');

        if (storedLatitude && storedLongitude) {
            console.log('Location found in localStorage:', { latitude: storedLatitude, longitude: storedLongitude });
            resolve({ latitude: parseFloat(storedLatitude), longitude: parseFloat(storedLongitude) });
            return;
        }

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("Geolocation allowed and stored:", { latitude, longitude });
                    localStorage.setItem('userLatitude', latitude);
                    localStorage.setItem('userLongitude', longitude);
                    resolve({ latitude, longitude });
                },
                (error) => {
                    console.error("Geolocation error during payment check:", error);
                    let errorMessage = "The user must allow us to access their location to proceed with payment.";

                    if (error.code === error.PERMISSION_DENIED) {
                        errorMessage = "Location access denied. Please enable location services for this site in your browser settings to proceed.";
                    } else if (error.code === error.POSITION_UNAVAILABLE) {
                        errorMessage = "Location information is unavailable. Please ensure your device's location services are enabled.";
                    } else if (error.code === error.TIMEOUT) {
                        errorMessage = "Failed to get location within the allowed time. Please try again.";
                    }
                    reject(errorMessage);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000, // Increased timeout for a more robust prompt
                    maximumAge: 0
                }
            );
        } else {
            const errorMessage = "Geolocation is not supported by this browser. Cannot proceed with payment.";
            console.error(errorMessage);
            reject(errorMessage);
        }
    });
}; 