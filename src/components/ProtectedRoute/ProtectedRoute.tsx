import { useAppState } from '../../context/AppState';
import ErrorPages from '../../pages/ErrorPages';
import MainApp from '../../pages/MainApp';

export default function ProtectedRoute(): JSX.Element {
  const {
    state: { currentUser },
  } = useAppState();

  if (!currentUser) {
    return <ErrorPages errorCode={403} />;
  }
  return <MainApp />;
}
