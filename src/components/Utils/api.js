import useUserStore from '@/zustandStore/useUserStore';
import { useRouter } from 'next/router';

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

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      clearUser();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return handleLogout;
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
