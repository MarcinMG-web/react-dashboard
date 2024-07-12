import { useAppState } from '../../context/AppState';
import ErrorPages from '../../pages/ErrorPages';
import MainApp from '../../pages/MainApp';

export default function ProtectedRoute(): JSX.Element {
  const {
    state: { authorizedUser },
  } = useAppState();

  if (!authorizedUser) {
    return <ErrorPages errorCode={403} />;
  }
  return <MainApp />;
}
