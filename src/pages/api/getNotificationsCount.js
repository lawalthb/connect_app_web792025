import { parse } from 'cookie';
import { API_URL } from '@/components/Utils/api';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token found' });
    }

    const response = await fetch(`${API_URL}/user-notifications/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    console.error('Connection request fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch connection request' });
  }
}
