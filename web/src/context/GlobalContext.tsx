import { createContext, useReducer, useEffect } from 'react';
import { getRepositories } from '../controller/repos';

interface Actions {
  type: string;
  payload: any;
}

interface State {
  repos: [];
}

const initialState: State = {
  repos: [],
};
export const GlobalContext = createContext<any>('');

const reducer = (state: State, action: Actions) => {
  // const value = action.payload?.value;
  // const param = action.payload?.param;
  // let id = action.payload?.id;

  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default function GlobalProvider(props: any) {
  const [globalState, globalDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function initApp() {
      let repos = await getRepositories();

      // (B) Displayed repositories in reverse chronological order by creation date
      repos = repos.sort(
        (a: any, b: any) =>
          new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
      );

      globalDispatch({
        type: 'INIT',
        payload: {
          repos,
        },
      });
    }
    initApp();
  }, []);

  return (
    <GlobalContext.Provider value={{ globalState, globalDispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
}
