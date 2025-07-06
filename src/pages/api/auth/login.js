import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return res
      .status(401)
      .json({ message: data.message || 'Authentication failed' });
  }

  if (!data.data.token) {
    return res.status(500).json({ message: 'Token not provided in response' });
  }

  // ✅ Set HTTP-only cookie
  //Localhost
  res.setHeader(
    'Set-Cookie',
    serialize('token', data.data.token, {
      path: '/',
      httpOnly: true, // optional: true if you don’t need JS access
      sameSite: 'lax', // important for localhost
      secure: false, // ✅ must be false on localhost
      maxAge: 60 * 60 * 24 * 7, // 1 week
    }),
  );

  // res.setHeader(
  //   'Set-Cookie',
  //   serialize('token', data.token, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'strict',
  //     maxAge: 60 * 60 * 24 * 7, // 1 week
  //     path: '/',
  //   }),
  // );

  res.status(200).json({ user: data.data.user });
}
