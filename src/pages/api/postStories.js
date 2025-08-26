import formidable from 'formidable';
import { parse } from 'cookie';
import { API_URL } from '@/components/Utils/api';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    console.warn('Token not found in cookies:', cookies);
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const form = formidable({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ message: 'Form parsing error' });
    }

    try {
      const formData = new FormData();
      formData.append('content', fields.content);
      formData.append('type', fields.type);
      formData.append('privacy', fields.privacy);
      formData.append('allow_replies', fields.allow_replies);

      const file = files.file;
      if (file) {
        formData.append('file', file);
      }

      const response = await fetch(`${API_URL}/stories`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      res.status(response.status).json(result);
    } catch (error) {
      console.error('Failed to upload story:', error);
      res.status(500).json({ message: error.message });
    }
  });
}
