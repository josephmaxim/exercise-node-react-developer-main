import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export default function LanguageFilter() {
  const { globalState } = useContext(GlobalContext);
  const { availableLanguages } = globalState;

  const displayLangBtn = availableLanguages.map(
    (language: string, key: string) => {
      return <button key={key}>{language}</button>;
    }
  );

  return <div>{displayLangBtn}</div>;
}
