import { ReactNode } from 'react'
import { useAppState } from '../../context/AppState'
import ErrorPages from '../../pages/ErrorPages'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const {
    state: { authorizedUser },
  } = useAppState()

  if (!authorizedUser) {
    return <ErrorPages errorCode={403} />
  }
  return <>{children}</>
}
