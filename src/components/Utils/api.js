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
  const response = await fetch(`${API_URL}/login`, {
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
    throw new Error(errorData.message || 'Sign In failed');
  }

  return response.json();
};
