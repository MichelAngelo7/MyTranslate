"use client";
import React from "react";
import Title from "../title/Title";
import { useState, useEffect } from "react";
import wordsData from "../../data/words.json";
import useStorageState from "../../utils/UseStorageState";
import normalize from "../../utils/Normalize";
import { useParams, useNavigate } from "react-router-dom";

function EditWord() {
  const wordInputRef = React.useRef(null);
  const [message, setMessage] = useState("");
  const [translate, setTranslate] = useState("");
  const [words, setWords] = useStorageState("words", wordsData);
  const [word, setWord] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

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
      setMessage("Digite uma palavra.");
      return;
    }

    const updatedWords = [...words];

    updatedWords[id] = {
      word: normalize(word),
      translate: normalize(translate),
    };

    setWords(updatedWords);

    setMessage("✅ Palavra editada!");
    wordInputRef.current.focus();
    setTimeout(() => navigate("/"), 1500);
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 rounded-xl shadow-md">
      <Title title={`Editando: ${word || "Palavra"}`} color="text-yellow-400" />
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
          {message === "✅ Palavra editada!" ? "Editted!" : "Edit"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-sm text-center ${
            message.includes("⚠️") ? "text-red-400" : "text-green-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default EditWord;
