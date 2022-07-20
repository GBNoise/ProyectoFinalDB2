import React, { createContext, useReducer } from 'react';
import { initialState, reducer } from './reducer';

export const globalContext = createContext({} as { dispatch: any; state: any });

export const GlobalContext = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <globalContext.Provider value={{ state, dispatch }}>
      {children}
    </globalContext.Provider>
  );
};
