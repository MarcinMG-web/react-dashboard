import React, { useReducer, useContext, ReactNode, Dispatch, useMemo } from 'react';
import { Action, initialState } from './InitialStateAndActions';
import { State } from './Interface';
import { appReducer } from './Reducer';

interface AppContextValue {
  state: State;
  dispatch: Dispatch<Action>;
}
// @ts-expect-error don't wont to pass initial values here
const AppContext = React.createContext<AppContextValue>();
AppContext.displayName = 'AppContext ';

interface AppProviderProps extends Partial<State> {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useAppState(): AppContextValue {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within AppProvider');
  }

  return context;
}

export { AppProvider, useAppState, AppContext };
