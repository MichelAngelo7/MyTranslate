"use client";
import React from "react";
import Title from "../title/Title";
import { useState, useEffect } from "react";
import wordsData from "../../data/words.json";
import useStorageState from "../../utils/UseStorageState";
import normalize from "../../utils/Normalize";
import { useParams, useNavigate } from "react-router-dom";
import Toast from "../toast/Toast";

function EditWord() {
  const wordInputRef = React.useRef(null);
  const [translate, setTranslate] = useState("");
  const [words, setWords] = useStorageState("words", wordsData);
  const [word, setWord] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  function handleToHome() {
    navigate("/");
  }

  useEffect(() => {
    if (words[id]) {
      setWord(words[id].word);
      setTranslate(words[id].translate);
    }
  }, [words, id]);
  function editWord(e) {
    e.preventDefault();

    if (!word) {
      setTranslate("");
      setToastMessage("⚠️ Digite uma palavra.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    if (words.some((item) => normalize(item.word) === normalize(word))) {
      setToastMessage("⚠️ Palavra já adicionada.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    const updatedWords = [...words];
    updatedWords[id] = {
      word: normalize(word),
      translate: normalize(translate),
    };

    setWords(updatedWords);
    setToastMessage("✅ Palavra editada!");
    setShowToast(true);
    wordInputRef.current.focus();

    setTimeout(() => {
      setShowToast(false);
      navigate("/");
    }, 1500);
  }
  return (
    <>
      <Toast message={toastMessage} showToast={showToast} />
      <button
        onClick={() => handleToHome()}
        className="w-full p-2 rounded-md bg-yellow-400 text-white font-bold hover:bg-yellow-500 disabled:opacity-50"
      >
        back to home
      </button>

      <div className="max-w-md mx-auto p-4 bg-gray-800 rounded-xl shadow-md">
        <Title
          title={`Editando: ${word || "Palavra"}`}
          color="text-yellow-400"
        />
        <form onSubmit={editWord} className="space-y-4">
          <div>
            <label
              htmlFor="word"
              className="block text-sm font-medium text-white"
            >
              Word:
            </label>
            <input
              ref={wordInputRef}
              id="word"
              type="text"
              placeholder="New word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="w-full mt-1 p-2 rounded-md border border-gray-500 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label
              htmlFor="translate"
              className="block text-sm font-medium text-white"
            >
              Translate:
            </label>
            <input
              id="translate"
              type="text"
              placeholder="New translate"
              value={translate}
              onChange={(e) => setTranslate(e.target.value)}
              className="w-full mt-1 p-2 rounded-md border border-gray-500 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            disabled={!word || !translate}
            className="w-full p-2 rounded-md bg-yellow-400 text-white font-bold hover:bg-yellow-500 disabled:opacity-50"
          >
            Edit
          </button>
        </form>
      </div>
    </>
  );
}

export default EditWord;
