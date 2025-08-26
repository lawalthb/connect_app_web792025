import '@/styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepicker-custom.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/components/lib/queryClient';
import { useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import { messagingPromise } from '@/components/Utils/firebase';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((reg) => console.log('Service Worker registered:', reg))
        .catch((err) =>
          console.error('Service Worker registration failed:', err),
        );
    }
  }, []);
  useEffect(() => {
    const setupMessaging = async () => {
      const messaging = await messagingPromise;
      if (!messaging) {
        console.log('Messaging not supported in this browser.');
        return;
      }

      // Request permission
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.log('Permission not granted for notifications');
        return;
      }

      // Get FCM token
      try {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY, // Add this in .env
        });
        console.log('FCM Token:', token);

        // send `token` to your backend for later push notifications
      } catch (err) {
        console.error('Error getting token:', err);
      }

      // Listen for foreground messages
      onMessage(messaging, (payload) => {
        console.log('Foreground notification:', payload);

        // You can also show a custom notification popup here
        new Notification(payload.notification?.title || 'New Notification', {
          body: payload.notification?.body,
        });
      });
    };

    setupMessaging();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
