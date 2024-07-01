import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import RoutesEnum from './types/routesEnum';

import ErrorPages from './pages/ErrorPages';
import Dashboard from './pages/Dashboard';
import { auth } from './api/firebase';
import { User } from 'firebase/auth';
import { useAppState } from './context/AppState';
import ProtectedRoute from './components/ProtectedRoute';
import { theme } from './theme';
import { SnackbarOrigin, SnackbarProvider } from 'notistack';
import { snackbarConfig } from './config/snackbarConfig';

export default function App(): JSX.Element {
  const {
    state: { registerApp },
    dispatch,
  } = useAppState();

  const { pathname } = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (pathname === RoutesEnum.REGISTER || user !== null) {
        dispatch({ type: 'SET_REGISTER_APP', payload: true });
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerApp]);

  const routes = [
    {
      path: RoutesEnum.REGISTER,
      component: <Dashboard />,
    },
    {
      path: RoutesEnum.DASHBOARD,
      component: <Dashboard />,
    },
    {
      path: RoutesEnum.APP,
      component: <ProtectedRoute />,
    },
    {
      path: RoutesEnum.ANYTHING,
      component: <ErrorPages errorCode={404} />,
    },
  ];

  return (
    <>
      <CssVarsProvider theme={theme} defaultMode='dark' disableTransitionOnChange>
        <SnackbarProvider
          iconVariant={snackbarConfig.iconVariant}
          anchorOrigin={snackbarConfig.anchorOrigin as SnackbarOrigin}
          autoHideDuration={snackbarConfig.autoHideDuration}
        >
          <Routes>
            {routes.map(({ path, component }) => (
              <Route path={path} element={component} key={path} />
            ))}
          </Routes>
        </SnackbarProvider>
      </CssVarsProvider>
    </>
  );
}
