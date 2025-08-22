import useUserStore from '@/zustandStore/useUserStore';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signUp = async (data) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('username', data.username);
  formData.append('country_id', data.country_id);
  formData.append('profile_image', data.profile_image);

  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
};

export const signIn = async (data) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Sign In failed');
  }

  return response.json();
};

export const useLogout = () => {
  const { clearUser } = useUserStore();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      clearUser();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { logout, isLoggingOut };
};

export const forgotPassword = async (data) => {
  const response = await fetch(`${API_URL}/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Action failed');
  }

  return response.json();
};

export const resetUserPassword = async (data) => {
  const response = await fetch(`${API_URL}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Reset password failed');
  }

  return response.json();
};

export const resendVerificationOtp = async (data) => {
  const response = await fetch(`${API_URL}/resend-verification-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Resend OTP Verification failed');
  }

  return response.json();
};
export const verifyEmail = async (data) => {
  const response = await fetch(`${API_URL}/verify-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Resend OTP Verification failed');
  }

  return response.json();
};

export const getSocialCircles = async () => {
  const response = await fetch(`${API_URL}/social-circles`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch Social Circles');
  }

  return response.json();
};

export const getPost = async () => {
  const response = await fetch('/api/getPost', {
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch Feeds');
  }

  return response.json();
};

export const getConversation = async () => {
  const response = await fetch('/api/getConversation', {
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch Feeds');
  }

  return response.json();
};

export const getSubscription = async () => {
  const response = await fetch('/api/getSubscription', {
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch Feeds');
  }

  return response.json();
};

export const getLatestLivestream = async () => {
  const response = await fetch('/api/getLatestLivestream', {
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch livestreams');
  }

  return response.json();
};

export const getProfileImages = async () => {
  const response = await fetch('/api/getProfileImages', {
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch Images');
  }

  return response.json();
};

export const getCountry = async () => {
  const response = await fetch('/api/getCountry', {
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch Feeds');
  }

  return response.json();
};

export const getAdvertDashboardData = async () => {
  const response = await fetch('/api/getAdvertDashboardData', {
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch Feeds');
  }

  return response.json();
};

export const posts = async (data) => {
  const formData = new FormData();
  formData.append('content', data.content);
  formData.append('media', data.media);
  formData.append('social_circle_id', data.social_circle_id);

  const response = await fetch('/api/posts', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
};

export const postAdvert = async (data) => {
  const formData = new FormData();

  formData.append('ad_name', data.ad_name ?? '');
  formData.append('type', data.type ?? '');
  formData.append('description', data.description ?? '');
  formData.append('budget', data.budget ?? '');
  formData.append('daily_budget', data.daily_budget ?? '');
  formData.append('destination_url', data.destination_url ?? '');
  formData.append('start_date', data.start_date ?? '');
  formData.append('end_date', data.end_date ?? '');
  formData.append('media_files[]', data['media_files[]'] ?? '');
  formData.append('target_countries[0]', data['target_countries[0]'] ?? '');

  formData.append(
    'target_social_circles[0]',
    data['target_social_circles[0]'] ?? null,
  );
  formData.append(
    'target_social_circles[1]',
    data['target_social_circles[1]'] ?? null,
  );
  formData.append(
    'target_social_circles[2]',
    data['target_social_circles[2]'] ?? null,
  );

  const response = await fetch('/api/postAdvert', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
};

export const changePassword = async (data) => {
  const response = await fetch('/api/changePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Change password failed');
  }

  return response.json();
};

export const deleteAccount = async (data) => {
  const response = await fetch('/api/deleteAccount', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Delete account failed');
  }

  return response.json();
};

export const stripePay = async (data) => {
  const response = await fetch('/api/stripePayment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Payment failed');
  }

  return response.json();
};

export const nombaPay = async (data) => {
  const response = await fetch('/api/nombaPayment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Payment failed');
  }

  return response.json();
};

export const updateProfile = async (data) => {
  const response = await fetch('/api/updateProfile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Profile update failed');
  }

  return response.json();
};

export const updateSocialCircles = async (data) => {
  const response = await fetch('/api/updateSocialCircles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Social Link update failed');
  }

  return response.json();
};

export const explore = async (data) => {
  const response = await fetch('/api/explore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Explore users failed');
  }

  return response.json();
};

export const exploreByPost = async (data) => {
  const response = await fetch('/api/exploreByPost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Explore users failed');
  }

  return response.json();
};

export const resumeAdvert = async (id) => {
  const response = await fetch('/api/resumeAdvert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Advert update failed');
  }

  return response.json();
};

export const pauseAdvert = async (id) => {
  const response = await fetch('/api/pauseAdvert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Advert update failed');
  }

  return response.json();
};

export const adPayment = async (data) => {
  const response = await fetch('/api/adPayment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Payment Initialization failed');
  }

  return response.json();
};

export const sendMessages = async (data) => {
  const formData = new FormData();

  // Append FormData fields
  formData.append('id', data.id);
  formData.append('message', data.message || '');
  formData.append('type', data.type || 'text');

  // Append file if available
  if (data?.file) {
    formData.append('file', data.file);
  }

  const response = await fetch('/api/sendMessages', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Message sending failed');
  }

  return response.json();
};

export const swipeCount = async (data) => {
  const response = await fetch('/api/swipeCount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Explore users failed');
  }

  return response.json();
};

export const initialteCall = async (data) => {
  const response = await fetch('/api/initialteCall', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Call initiation failed');
  }

  return response.json();
};

export const getUser = async (id) => {
  const response = await fetch(`/api/getUser?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Fetch user failed');
  }

  return response.json();
};

export const getAdvertsListings = async (
  perPage,
  page,
  addName,
  advertStatus,
  startDate,
  endDate,
) => {
  const response = await fetch(
    `/api/getAdvertsListings?per_page=${perPage}&page=${page}&ad_name=${addName}status=${advertStatus}&start_date=${startDate}&end_date=${endDate}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Fetch advert listings failed');
  }

  return response.json();
};

export const getMessages = async (id, page, perPage) => {
  const response = await fetch(
    `/api/getMessages?page=${page}&per_page=${perPage}&id=${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Fetch messages failed');
  }

  return response.json();
};

export const readMessages = async (id) => {
  if (!id) return;
  const response = await fetch(`/api/readMessages?id=${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Read messages failed');
  }

  return response.json();
};

export const reportUser = async (data, id) => {
  if (!id) return;
  const response = await fetch(`/api/reportUser?id=${id}`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Report failed');
  }

  return response.json();
};

export const postComment = async (data, id) => {
  if (!id) return;
  const response = await fetch(`/api/postComment?id=${id}`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Commenting failed');
  }

  return response.json();
};

export const viewStream = async (id) => {
  if (!id) return;
  const response = await fetch(`/api/viewStream?id=${id}`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Stream failed');
  }

  return response.json();
};

export const deletePost = async (id) => {
  if (!id) return;
  const response = await fetch(`/api/deletePost?id=${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Delete failed');
  }

  return response.json();
};

export const getImpressions = async (year) => {
  const response = await fetch(`/api/getImpressions?year=${year}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Fetch impressions failed');
  }

  return response.json();
};

export const getAnalyticsAvailableYear = async () => {
  const response = await fetch(`/api/getAnalyticsAvailableYear`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Fetch analytics failed');
  }

  return response.json();
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload/avatar', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const postStories = async (data) => {
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('content', data.content);

  try {
    const response = await fetch('/api/postStories', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload story');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const verifyMe = async (data) => {
  const formData = new FormData();
  formData.append('id_card_image', data.id_card_image);
  formData.append('id_card_type', data.id_card_type);

  try {
    const response = await fetch('/api/verifyMe', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Verification failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Verification failed:', error);
    throw error;
  }
};
