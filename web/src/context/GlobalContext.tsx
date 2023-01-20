import { createContext, useReducer } from 'react';

interface Actions {
  type: string;
  payload: {
    value: string | number | any;
    param: string;
    id: number;
  };
}

type State = any;

export const GlobalContext = createContext<any>('');

const initialState: any = {};

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case 'INIT':
      return action.payload;
    default:
      return state;
  }
}

export default function GlobalProvider(props: any) {
  const [globalState, globalDispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ globalState, globalDispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
}
