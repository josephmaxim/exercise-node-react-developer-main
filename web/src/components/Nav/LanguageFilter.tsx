import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export default function LanguageFilter() {
  const { globalState, globalDispatch } = useContext(GlobalContext);
  const { availableLanguages, selectedLanguage } = globalState;

  const handleFilterBtn = (e: any) => {
    const { value } = e.target;
    globalDispatch({ type: 'SELECT_LANGUAGE', payload: { value } });
  };

  const displayLangBtn = availableLanguages.map(
    (language: string, key: string) => {
      return (
        <button
          key={key}
          onClick={handleFilterBtn}
          value={selectedLanguage === language ? '' : language}
          className={selectedLanguage === language ? 'active' : ''}
        >
          {language}
        </button>
      );
    }
  );

  return <div className="language-filter">{displayLangBtn}</div>;
}
