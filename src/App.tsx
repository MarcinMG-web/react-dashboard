import { Route, Routes } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import RoutesEnum from './types/routesEnum';

import ErrorPages from './pages/ErrorPages';
import Dashboard from './pages/Dashboard';

import ProtectedRoute from './components/ProtectedRoute';
import { theme } from './theme';

export default function App(): JSX.Element {
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
        <Routes>
          {routes.map(({ path, component }) => (
            <Route path={path} element={component} key={path} />
          ))}
        </Routes>
      </CssVarsProvider>
    </>
  );
}
