// Simple geolocation service

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      return reject(new Error('Geolocation not supported'));
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        resolve({ latitude, longitude, accuracy, timestamp: pos.timestamp });
      },
      (err) => {
        reject(new Error(err.message || 'Unable to get location'));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );
  });
};