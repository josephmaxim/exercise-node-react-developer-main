import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import LanguageFilter from '../components/Nav/LanguageFilter';

export function App() {
  const { globalState } = useContext(GlobalContext);
  const { repos, selectedLanguage } = globalState;

  // Filter repos based on selected language;
  function filterRepos(repo: any) {
    const { language } = repo;
    const match = language === selectedLanguage;
    return selectedLanguage === '' ? true : match;
  }

  const displayRepos = repos.flatMap((repo: any, key: string) =>
    filterRepos(repo) ? (
      <ul key={key}>
        <li>Name: {repo.name}</li>
        <li>Description: {repo.description}</li>
        <li>Language: {repo.language}</li>
        <li>Forks Count: {repo.forks_count}</li>
      </ul>
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
