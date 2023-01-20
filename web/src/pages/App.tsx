import { useContext, Fragment } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import LanguageFilter from '../components/Nav/LanguageFilter';

export function App() {
  const { globalState, globalDispatch } = useContext(GlobalContext);
  const { repos, selectedLanguage } = globalState;

  // Filter repos based on selected language;
  function filterRepos(repo: any) {
    const { language } = repo;
    const match = language === selectedLanguage;
    return selectedLanguage === '' ? true : match;
  }

  const handleExpandBtn = (e: any) => {
    const { value } = e.target;
    globalDispatch({ type: 'TOGGLE_REPO', payload: { id: value } });
  };

  const displayRepos = repos.flatMap((repo: any, key: string) =>
    filterRepos(repo) ? (
      <Fragment key={key}>
        <ul>
          <li>
            Name:{' '}
            <button onClick={handleExpandBtn} value={repo.id}>
              {repo.name}
            </button>
          </li>
          <li>Description: {repo.description}</li>
          <li>Language: {repo.language}</li>
          <li>Forks Count: {repo.forks_count}</li>
        </ul>
        {repo.isExpanded ? (
          <div>
            <ul>
              <li>
                Recent commit date:{' '}
                {new Date(repo.updated_at).toLocaleDateString()}
              </li>
              <li>Author: {repo.owner.login}</li>
              {/* No message prop in the array objects... */}
              <li>Message: </li>
            </ul>
          </div>
        ) : null}
      </Fragment>
    ) : (
      []
    )
  );

  return (
    <main>
      <LanguageFilter />
      {displayRepos}
    </main>
  );
}
