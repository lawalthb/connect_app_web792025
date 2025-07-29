import { IncomingForm } from 'formidable';
import { parse } from 'cookie';
import fs from 'fs';
import { API_URL } from '@/components/Utils/api';

export const config = {
  api: {
    bodyParser: false, // Disables Next.js default body parsing
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ message: 'Form parsing error' });
    }

    const id = fields.id;
    const message = fields.message;
    const type = fields.type;
    const file = files.file;

    const formData = new FormData();
    formData.append('message', message);
    formData.append('type', type);

    if (file) {
      formData.append(
        'file',
        fs.createReadStream(file.filepath),
        file.originalFilename,
      );
    }

    try {
      const response = await fetch(`${API_URL}/conversations/${id}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      res.status(response.status).json(result);
    } catch (error) {
      console.error('Message sending error:', error);
      res.status(500).json({ error: error.message });
    }
  });
}
