import { useEffect, useState } from "react";
import "./App.css";

const useStorageState = (key, initialState) => {
  const isArray = Array.isArray(initialState);

  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);

    if (stored) {
      try {
        return isArray ? JSON.parse(stored) : stored;
      } catch {
        return initialState;
      }
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, isArray ? JSON.stringify(value) : value);
  }, [key, value, isArray]);

  return [value, setValue];
};

function App() {
  const [words, setWords] = useStorageState("words", []);
  const [word, setWord] = useState("");
  const [translate, setTranslate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  function normalize(text) {
    return text.trim().toLowerCase();
  }

  const searchedWords = words.filter(({ word, translate }) => {
    return (
      word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translate.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  function addWord() {
    if (word === "") {
      setTranslate("");
      return;
    }

    if (
      words.some(
        (item) => item.word.trim().toLowerCase() === word.trim().toLowerCase()
      )
    ) {
      alert("Palavra já adicionada.");
      setWord("");
      setTranslate("");
      return;
    }

    setWords([
      ...words,
      { word: normalize(word)  , translate: normalize(translate) },
    ]);
    setWord("");
    setTranslate("");

    alert("Adicionada!");
  }

  function handleInputWord(event) {
    const word = event.target.value;
    setWord(word);
  }

  function handleInputTranslate(event) {
    const translate = event.target.value;
    setTranslate(translate);
  }

  function handleInputSearch(event) {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  }

  function handleRemoveWord(wordRemove) {
    let answer = window.confirm("Delete word?");
    if (answer) {
      const updated = words.filter((item) => item.word !== wordRemove);
      setWords(updated);
    }
  }

  function handleExportJson() {
    const wordsJson = JSON.stringify(words, null, 2);

    const blob = new Blob([wordsJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "words.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  function handleSort(){
    const sorted = [...words].sort((a,b) => a.word.localeCompare(b.word))
    setWords(sorted)
  }

  return (
    <>
      <h1>Dictionary</h1>
      <div>
        <button type="button" onClick={() => handleExportJson()}>
          Export to json
        </button>
        <button type="button" onClick={() => handleSort()}>Sort</button>
      </div>
      <label htmlFor="word">Word:</label>
      &nbsp;
      <input
        id="word"
        type="text"
        placeholder="New word"
        aria-label="New word"
        title="New word"
        value={word}
        onChange={handleInputWord}
      />
      <div>
        <label htmlFor="translate">Translate:</label>
        <input
          id="translate"
          type="text"
          placeholder="New translate"
          title="New translate"
          aria-label="New translate"
          value={translate}
          onChange={handleInputTranslate}
        />
      </div>
      {word && translate ? <button onClick={addWord}>Add</button> : <></>}
      <hr />
      <label htmlFor="searchTerm">Search:</label>
      <input
        id="searchTerm"
        type="text"
        placeholder="Search"
        title="Search"
        aria-label="Search"
        value={searchTerm}
        onChange={handleInputSearch}
      />
      <ul>
        {searchedWords.map(({ word, translate }, index) => {
          return (
            <li key={`${word}-${index}`}>
              <strong>{word}</strong> - {translate} -
              <span>
                <button type="button" onClick={() => handleRemoveWord(word)}>
                  X
                </button>
              </span>
            </li>
          );
        })}
      </ul>
      <hr />
    </>
  );
}

export default App;
