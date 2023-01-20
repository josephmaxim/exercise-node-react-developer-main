import { createContext, useReducer, useEffect } from 'react';
import { getRepositories } from '../controller/repos';

interface Actions {
  type: string;
  payload: any;
}

interface State {
  repos: [];
  availableLanguages: [];
  selectedLanguage: string;
}

const initialState: State = {
  repos: [],
  availableLanguages: [],
  selectedLanguage: '',
};
export const GlobalContext = createContext<any>('');

const reducer = (state: State, action: Actions) => {
  const value = action.payload?.value;
  // const param = action.payload?.param;
  // let id = action.payload?.id;

  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        ...action.payload,
      };
    case 'SELECT_LANGUAGE':
      return {
        ...state,
        selectedLanguage: value,
      };
    default:
      return state;
  }
};

export default function GlobalProvider(props: any) {
  const [globalState, globalDispatch] = useReducer(reducer, initialState);

  // Initial App Load
  useEffect(() => {
    async function initApp() {
      let repos = await getRepositories();

      // (B) 3. Displayed repositories in reverse chronological order by creation date
      repos = repos.sort(
        (a: any, b: any) =>
          new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
      );

      // Get all available language type
      const availableLanguages = repos.reduce(
        (languages: string[], repo: any) => {
          const { language } = repo;
          if (!languages.includes(language)) {
            languages.push(language);
          }
          return languages;
        },
        []
      );

      globalDispatch({
        type: 'INIT',
        payload: {
          repos,
          availableLanguages,
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
