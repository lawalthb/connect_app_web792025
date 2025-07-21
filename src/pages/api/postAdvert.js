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

  const form = formidable({ keepExtensions: true, multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ message: 'Form parsing error' });
    }

    try {
      const formData = new FormData();

      // Append text fields
      formData.append('ad_name', fields.ad_name || '');
      formData.append('type', fields.type || '');
      formData.append('description', fields.description || '');
      formData.append('budget', fields.budget || '');
      formData.append('daily_budget', fields.daily_budget || '');
      formData.append('destination_url', fields.destination_url || '');
      formData.append('start_date', fields.start_date || '');
      formData.append('end_date', fields.end_date || '');

      if (fields['target_countries[0]']) {
        formData.append('target_countries[0]', fields['target_countries[0]']);
      }

      // Append social circles
      ['0', '1', '2'].forEach((index) => {
        const key = `target_social_circles[${index}]`;
        if (fields[key]) {
          formData.append(key, fields[key]);
        }
      });

      // Append media file if present
      const file = files['media_files[]'];
      if (file?.filepath) {
        formData.append(
          'media_files[]',
          fs.createReadStream(file.filepath),
          file.originalFilename,
        );
      }

      // Make the API request
      const response = await fetch(`${API_URL}/ads`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      res.status(response.status).json(result);
    } catch (error) {
      console.error('Failed to upload post:', error);
      res.status(500).json({ message: error.message });
    }
  });
}
