import { parse } from 'cookie';
import { API_URL } from '@/components/Utils/api';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;

  const { id } = req.query;

  const payload = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token found' });
  }

  try {
    const response = await fetch(`${API_URL}/posts/${id}/report`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error reporting user:', error);
    return res.status(500).json({ message: 'Server error reporting user' });
  }
}
