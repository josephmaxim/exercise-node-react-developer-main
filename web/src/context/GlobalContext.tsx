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
  const id = parseInt(action.payload?.id, 10);

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
    case 'TOGGLE_REPO':
      return {
        ...state,
        repos: state.repos.map((repo: any) => {
          if (repo.id === id) {
            return { ...repo, isExpanded: !repo.isExpanded, markdown: value };
          }
          return { ...repo, isExpanded: false };
        }),
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

      // Add isExpanded flag for each repository
      repos = repos.map((repo: any) => {
        return { ...repo, isExpanded: false, markdown: '' };
      });

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
