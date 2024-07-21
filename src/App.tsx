import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import RoutesEnum from './types/routesEnum';
import ErrorPages from './pages/ErrorPages';
import AuthenticationPages from './pages/AuthenticationPages';
import { auth } from './api/firebase';
import { User } from 'firebase/auth';
import { useAppState } from './context/AppState';
import { SnackbarOrigin, SnackbarProvider } from 'notistack';
import { StyledMaterialDesignContent, snackbarConfig } from './config/snackbarConfig';
import ProtectedRoute from './components/ProtectedRoute';

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

    return () => {
      unsubscribe();
    };
  }, [dispatch, pathname, registerApp]);

  const routes = [
    {
      path: RoutesEnum.REGISTER,
      component: <AuthenticationPages />,
    },
    {
      path: RoutesEnum.LOGIN,
      component: <AuthenticationPages />,
    },
    {
      path: RoutesEnum.ORDERS,
      component: <ProtectedRoute />,
    },
    {
      path: RoutesEnum.ANYTHING,
      component: <ErrorPages errorCode={404} />,
    },
  ];

  return (
    <>
      <CssVarsProvider defaultMode='dark' disableTransitionOnChange>
        <SnackbarProvider
          iconVariant={snackbarConfig.iconVariant}
          anchorOrigin={snackbarConfig.anchorOrigin as SnackbarOrigin}
          autoHideDuration={snackbarConfig.autoHideDuration}
          Components={{
            success: StyledMaterialDesignContent,
            error: StyledMaterialDesignContent,
            warning: StyledMaterialDesignContent,
            info: StyledMaterialDesignContent,
          }}
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
