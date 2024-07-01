import MainApp from '../pages/MainApp';
import ErrorPages from '../pages/ErrorPages';
import { useAppState } from '../context/AppState';

export default function ProtectedRoute() {
  const {
    state: { currentUser },
  } = useAppState();

  if (!currentUser) {
    return <ErrorPages errorCode={403} />;
  }
  return <MainApp />;
}
