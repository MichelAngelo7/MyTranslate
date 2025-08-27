import { useState } from "react";
import wordsData from "./data/words.json";
import "./App.css";
import useStorageState from "./utils/UseStorageState";
import normalize from "./utils/Normalize";
import { useNavigate } from "react-router-dom";
import Title from "./components/title/Title";
import Toast from "./components/toast/Toast";
import ConfirmModal from "./components/confirmModal/ConfirmModal";

function App() {
  const navigate = useNavigate();
  const [words, setWords] = useStorageState("words", wordsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [wordToRemove, setWordToRemove] = useState(null);
  const searchedWords = words.filter(({ word, translate }) => {
    return (
      word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translate.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  function askRemoveWord(word) {
    setWordToRemove(word);
    setShowModal(true);
  }

  function handleNormalizeWords() {
    const normalized = words.map(({ word, translate }) => ({
      word: normalize(word),
      translate: normalize(translate),
    }));
    setWords(normalized);
    setToastMessage("✅ Lista normalizada");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }

  function handleInputSearch(event) {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  }

  function confirmRemoveWord(wordRemove) {
    const updated = words.filter((item) => item.word !== wordRemove);
    setWords(updated);

    setToastMessage("🗑️ Palavra removida");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);

    setShowModal(false);
    setWordToRemove(null);
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
    setToastMessage("💾 Arquivo salvo com sucesso");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }

  function handleSort() {
    const sorted = [...words].sort((a, b) => a.word.localeCompare(b.word));
    setWords(sorted);
    setToastMessage("✅ Lista atualizada");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }

  return (
    <div className="mx-auto p-4 bg-gray-900 rounded shadow text-white">
      <Title title="📚 Dictionary" color="text-yellow-400" />
      <Toast message={toastMessage} showToast={showToast} />
      <ConfirmModal
        isOpen={showModal}
        title="Confirmar exclusão"
        message={`Deseja realmente remover a palavra "${wordToRemove}"?`}
        onConfirm={() => confirmRemoveWord(wordToRemove)}
        onCancel={() => setShowModal(false)}
      />
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => handleExportJson()}
          className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
        >
          Export
        </button>
        <button
          type="button"
          onClick={() => handleSort()}
          className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
        >
          Sort
        </button>
        <button
          type="button"
          onClick={() => handleNormalizeWords()}
          className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
        >
          normalize
        </button>

        <button
          type="button"
          onClick={() => navigate("/add")}
          className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="mb-4">
        <label htmlFor="searchTerm" className="block text-sm mb-1">
          Search:
        </label>
        <input
          id="searchTerm"
          type="text"
          placeholder="Search..."
          title="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={handleInputSearch}
          className="w-full p-2 rounded border border-gray-600 bg-gray-800"
        />
      </div>
      {searchedWords.length === 0 ? (
        <p className="text-gray-400">Nenhuma palavra encontrada 😕</p>
      ) : (
        <ul className="space-y-2">
          {searchedWords.map(({ word, translate }, index) => {
            return (
              <li
                key={`${word}-${index}`}
                className="flex justify-between items-center bg-gray-800 p-2 rounded"
              >
                <span>
                  <strong>{word}</strong> — {translate}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(index)}
                    className="px-2 py-1 bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => askRemoveWord(word)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remover
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <hr />
    </div>
  );
}

export default App;
