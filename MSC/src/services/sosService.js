// SOS alert service

const SOS_ENDPOINT = 'https://api.example.com/sos-alert'; // Replace with your backend endpoint

/**
 * Sends an SOS alert to authorities with audio and location data
 * @param {Object} payload
 * @param {{latitude:number, longitude:number, accuracy:number, timestamp:number}} payload.location
 * @param {File|null} payload.audioFile
 * @param {Object} payload.analysis
 * @param {string[]} payload.reasons
 */
export const sendSOSAlert = async ({ location, audioFile, analysis, reasons }) => {
  // Mock sending for demo
  await new Promise((res) => setTimeout(res, 1000));
  
  // Return mock result
  return {
    status: 'sent',
    referenceId: Math.random().toString(36).slice(2),
    dispatchedAt: new Date().toISOString(),
    location,
    reasons,
  };

  /* Real implementation example:
  const formData = new FormData();
  formData.append('latitude', location.latitude);
  formData.append('longitude', location.longitude);
  formData.append('accuracy', location.accuracy);
  formData.append('timestamp', location.timestamp);
  formData.append('analysis', JSON.stringify(analysis));
  formData.append('reasons', JSON.stringify(reasons));
  if (audioFile) formData.append('audio', audioFile);

  const resp = await fetch(SOS_ENDPOINT, { method: 'POST', body: formData });
  if (!resp.ok) throw new Error('Failed to send SOS alert');
  return await resp.json();
  */
};