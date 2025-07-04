export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signUp = async (data) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('username', data.username);
  formData.append('country_id', data.country_id);
  formData.append('profile_image', data.profile_image);

  const response = await fetch(`${API_URL}/register`, {
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

export const handleLogout = async () => {
  await fetch('/api/auth/logout', {
    method: 'POST',
  });
  router.push('/login');
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
