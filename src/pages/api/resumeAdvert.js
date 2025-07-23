import { API_URL } from '@/components/Utils/api';
import { parse } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    console.warn('Token not found in cookies:', cookies);
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;

  try {
    const response = await fetch(`${API_URL}/ads/${id}/resume`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    console.error('Advert update error:', error);
    res.status(500).json({ error: error.message });
  }
}
