import { useAppState } from '../../context/AppState';
import ErrorPages from '../../pages/ErrorPages';
import OrdersPage from '../../pages/OrdersPage';

export default function ProtectedRoute(): JSX.Element {
  const {
    state: { authorizedUser },
  } = useAppState();

  if (!authorizedUser) {
    return <ErrorPages errorCode={403} />;
  }
  return <OrdersPage />;
}
