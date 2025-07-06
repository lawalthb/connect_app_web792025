import formidable from 'formidable';
import fs from 'fs';
import { API_URL } from '@/components/Utils/api';
import { serialize } from 'cookie'; // <-- install if needed: npm i cookie

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const form = formidable({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ message: 'Form parsing failed' });
    }

    try {
      const formData = new FormData();
      formData.append('name', fields.name);
      formData.append('email', fields.email);
      formData.append('password', fields.password);
      formData.append('username', fields.username);
      formData.append('country_id', fields.country_id);

      const profileImage = files.profile_image;

      if (profileImage?.filepath) {
        formData.append(
          'profile_image',
          fs.createReadStream(profileImage.filepath),
          profileImage.originalFilename,
        );
      }

      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!data.data.token) {
        return res
          .status(500)
          .json({ message: 'Token not provided in response' });
      }

      res.setHeader(
        'Set-Cookie',
        serialize('token', data.data.token, {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          secure: false,
          maxAge: 60 * 60 * 24 * 7,
        }),
      );

      res.status(response.status).json({ user: data.data.user });
    } catch (error) {
      console.error('Registration failed:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });
}
