import { useState } from "react";
import wordsData from "./data/words.json";
import "./App.css";
import useStorageState from "./utils/UseStorageState";
import normalize from "./utils/Normalize";
import Title from "./components/title/Title";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [words, setWords] = useStorageState("words", wordsData);
  const [searchTerm, setSearchTerm] = useState("");
  const searchedWords = words.filter(({ word, translate }) => {
    return (
      word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translate.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  function handleNormalizeWords() {
    const normalized = words.map(({ word, translate }) => ({
      word: normalize(word),
      translate: normalize(translate),
    }));
    setWords(normalized);
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

  function handleEdit(index) {
    navigate(`edit/${index}`);
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

  function handleSort() {
    const sorted = [...words].sort((a, b) => a.word.localeCompare(b.word));
    setWords(sorted);
  }

  return (
    <>
      <Title title="Dictionary" color="text-yellow-400" />
      <div>
        <button
          type="button"
          onClick={() => handleExportJson()}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Export to json
        </button>
        <button
          type="button"
          onClick={() => handleSort()}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sort
        </button>
        <button
          type="button"
          onClick={() => handleNormalizeWords()}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          normalize
        </button>
      </div>
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
                <button type="button" onClick={() => handleEdit(index)}>
                  edit
                </button>
              </span>
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
