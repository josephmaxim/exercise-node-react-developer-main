import { useContext, Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import { GlobalContext } from '../context/GlobalContext';
import { getMarkDownData } from '../controller/repos';
import LanguageFilter from '../components/Nav/LanguageFilter';

export function App() {
  const { globalState, globalDispatch } = useContext(GlobalContext);
  const { repos, selectedLanguage, fetchFailed } = globalState;

  // Filter repos based on selected language;
  function filterRepos(repo: any) {
    const { language } = repo;
    const match = language === selectedLanguage;
    return selectedLanguage === '' ? true : match;
  }

  const handleExpandBtn = async (repo: any) => {
    const { id, full_name } = repo;

    // check if theres a README.md associated with the repo
    const markdownData: string = await getMarkDownData(full_name);

    globalDispatch({
      type: 'TOGGLE_REPO',
      payload: { id, value: markdownData },
    });
  };

  const handleFetchRetryBtn = () => {
    window.location.reload();
  };

  const displayRepos = repos.flatMap((repo: any, key: string) =>
    filterRepos(repo) ? (
      <Fragment key={key}>
        <button
          className="repos"
          onClick={() => handleExpandBtn(repo)}
          value={repo.id}
        >
          <h2>{repo.name}</h2>
          <ul>
            <li>Description: {repo.description}</li>
            <li>Language: {repo.language}</li>
            <li>Forks Count: {repo.forks_count}</li>
          </ul>
        </button>
        {repo.isExpanded ? (
          <div className="modal">
            <div className="container">
              <button onClick={() => handleExpandBtn(repo)} value={repo.id}>
                &#8592; Return
              </button>
              <ul>
                <li>Author: {repo.owner.login}</li>
                <li>
                  Recent commit:{' '}
                  {new Date(repo.updated_at).toLocaleDateString()}
                </li>
                {/* No message prop in the array objects... */}
              </ul>
              <hr />
              <div className="markdown">
                {repo.markdown !== '' ? (
                  <ReactMarkdown children={repo.markdown} />
                ) : (
                  <>No markdown available for this repo.</>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </Fragment>
    ) : (
      []
    )
  );

  return (
    <main className="app">
      <div className="container">
        <LanguageFilter />
        {displayRepos}
        {fetchFailed ? (
          <div className="error-dialog">
            <p>There was a problem fetching the repositories!</p>
            <button onClick={handleFetchRetryBtn}>Try Again</button>
          </div>
        ) : null}
      </div>
    </main>
  );
}
