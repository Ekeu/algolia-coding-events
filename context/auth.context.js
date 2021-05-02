import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => checkIfUserSignedIn(), []);

  // SignUp user
  const signup = async (user) => {
    setLoading(true);
    const res = await fetch(`${NEXT_URL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      setLoading(false);
      router.push('/auth/me/dashboard');
    } else {
      setError(data.message);
      setError(null); //so that error doesn't stay in state
      setLoading(false);
    }
  };

  // Signin user
  /**
   * Destructured because on strapi it isn't called email but identifier
   */
  const signin = async ({ email: identifier, password }) => {
    setLoading(true);
    const res = await fetch(`${NEXT_URL}/api/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      setLoading(false);
      router.push('/auth/me/dashboard');
    } else {
      setError(data.message);
      setError(null); //so that error doesn't stay in state
      setLoading(false);
    }
  };

  // Signout user
  const signout = async () => {
    const res = await fetch(`${NEXT_URL}/api/signout`, {
      method: 'POST',
    });

    if (res.ok) {
      setUser(null);
      router.push('/');
    }
  };

  // Check if user has signed in
  const checkIfUserSignedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/auth/me/dashboard');
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, error, signup, signin, signout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
