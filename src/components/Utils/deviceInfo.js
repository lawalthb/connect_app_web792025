import { v4 as uuidv4 } from 'uuid';

export function getDeviceId() {
  let id = localStorage.getItem('device_id');
  if (!id) {
    id = uuidv4();
    localStorage.setItem('device_id', id);
  }
  return id;
}

export function getPlatform() {
  if (typeof window === 'undefined') return 'unknown';
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('android')) return 'android';
  if (ua.includes('iphone') || ua.includes('ipad')) return 'ios';
  if (ua.includes('windows')) return 'windows';
  if (ua.includes('mac')) return 'mac';
  return 'web';
}

export function getAppVersion() {
  // Set your app version here, or import from package.json
  return '1.0.0';
}
