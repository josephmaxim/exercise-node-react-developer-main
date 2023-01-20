import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

export function App() {
  const { globalState } = useContext(GlobalContext);
  const { repos } = globalState;

  const displayRepos = repos.map((repo: any, key: string) => {
    const { name, description, language, forks_count } = repo;
    return (
      <ul key={key}>
        <li>Name: {name}</li>
        <li>Description: {description}</li>
        <li>Language: {language}</li>
        <li>Forks Count: {forks_count}</li>
      </ul>
    );
  });

  return <main>{displayRepos}</main>;
}
