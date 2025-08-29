import { parse } from 'cookie';
import { API_URL } from '@/components/Utils/api';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.token;

    const { id } = req.query;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token found' });
    }

    const response = await fetch(`${API_URL}/streams/${id}/chat`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    console.error('Livestreams fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch livestreams' });
  }
}
