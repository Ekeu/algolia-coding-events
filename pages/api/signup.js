import cookie from 'cookie';
import { API_URL } from '@/config/index';

export default async (req, res) => {
  const { username, email, password, photoURL } = req.body;

  const strapiFetch = await fetch(`${API_URL}/auth/local/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      photoURL,
    }),
  });

  const data = await strapiFetch.json();

  if (strapiFetch.ok) {
    // Set HttpOnly Cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', data.jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, //1week
        sameSite: 'strict',
        path: '/',
      })
    );
    res.status(200).json({ user: data.user });
  } else {
    res
      .status(data.statusCode)
      .json({ message: data.message[0].messages[0].message });
  }
};
