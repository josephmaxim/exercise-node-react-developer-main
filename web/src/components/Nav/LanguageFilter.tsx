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
          style={{
            background: selectedLanguage === language ? 'blue' : '',
          }}
        >
          {language}
        </button>
      );
    }
  );

  return <div>{displayLangBtn}</div>;
}
