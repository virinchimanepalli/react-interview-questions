import React from 'react';
import './App.scss';
import './styles/styles.css';
import Autocomplete from './components/AutoCompleteV3';

const END_POINT = 'https://rickandmortyapi.com/api/character';

function App() {
  const onSelectItem = (value) => {
    console.log(value, 'value');
  };

  return (
    <>
      <div>Hello world - v3</div>

      <Autocomplete
        onSelectItem={onSelectItem}
        placeholder="search..."
        endpoint={END_POINT}
        delay={200}
        minChars={0}
      />
    </>
  );
}

export default App;
