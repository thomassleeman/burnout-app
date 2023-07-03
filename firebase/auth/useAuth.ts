/* THIS HOOK CN BE DELETED! */

import { useState, useEffect } from 'react';
import { auth } from '@/firebase/auth/appConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';

type UseAuthReturnType = {
  user: firebase.User | null;
  token: string | null;
  loading: boolean;
  error: firebase.auth.Error | null;
};

const useAuth = (): UseAuthReturnType => {
  const [user, loading, error] = useAuthState(auth);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const userToken = await user.getIdToken();
        setToken(userToken);
      } else {
        setToken(null);
      }
    };

    fetchToken();
  }, [user]);

  return { user, token, loading, error };
};

export default useAuth;
