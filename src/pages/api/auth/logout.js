import { serialize } from 'cookie';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') return res.status(405).end();

  // Clear the token cookie
  res.setHeader(
    'Set-Cookie',
    serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0), // Expire immediately
      path: '/',
    }),
  );

  return res.status(200).json({ message: 'Logged out successfully' });
}
