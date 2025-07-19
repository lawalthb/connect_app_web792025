// pages/api/getAdvertsListings.js
import { parse } from 'cookie';
import { API_URL } from '@/components/Utils/api';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;

  const { year } = req.query;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token found' });
  }

  try {
    const response = await fetch(
      `${API_URL}/ads/analytics/impressions-overtime?year=${year}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching adverts impressions:', error);
    return res
      .status(500)
      .json({ message: 'Server error fetching impressions' });
  }
}
