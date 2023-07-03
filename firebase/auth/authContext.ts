import { app } from '@/firebase/auth/appConfig';
import React, { useContext, useState } from 'react';

const CSessionContext = React.createContext();

const CSessionProvider = ({ children }) => {
  const [cSession, setCSession] = useState({});

  return (
    <CSessionContext.Provider
      value={{
        cSession,
        setCSession,
      }}
    >
      {children}
    </CSessionContext.Provider>
  );
};

export const useCSessionContext = () => {
  return useContext(CSessionContext);
};

// export const useGlobalSession = () => {
//   const [authFeed, setAuthFeed] = useState({
//     type: 'noSession',
//     session: null,
//     status: null,
//   });

//   const { data: session, status } = useSession();
//   const { cSession } = useCSessionContext();
//   if (session) {
//     setAuthFeed({
//       type: 'oAuthSession',
//       session: session,
//       status: status,
//     });
//   }
//   if (cSession) {
//     setAuthFeed({
//       type: 'cSession',
//       session: cSession,
//       status: null,
//     });
//   }
//   if (session && cSession) {
//     setAuthFeed({
//       type: 'error',
//       session: null,
//       status: null,
//     });
//     console.log('error, both oAuth and cAuth sessions are active!🤡');
//   } else {
//     setAuthFeed({
//       type: 'noSession',
//       session: null,
//       status: null,
//     });
//   }
//   return authFeed;
// };

export { CSessionContext, CSessionProvider };
