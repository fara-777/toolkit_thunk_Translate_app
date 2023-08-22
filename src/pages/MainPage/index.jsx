import { useEffect, useState, useRef } from "react";
import { FaRightLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getAnswer, getLanguages } from "../../redux/action";
import Select from "react-select";
import { clearAnswer } from "../../redux/translateSlice";

export default function MainPages() {
  const store = useSelector((store) => store);

  // State for input text
  const [text, setText] = useState("");

  // State for source language selection
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });

  // State for target language selection
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  // Redux dispatch
  const dispatch = useDispatch();

  // Fetch languages when component mounts
  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  // Ref for input textarea
  const areaRef = useRef();

  // Swap source and target languages and clear answer
  const handleClick = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    dispatch(clearAnswer());
    areaRef.current.value = "";
  };

  return (
    <>
      <h2> Translate</h2>
      <div className="container">
        {/* Left column: Source language and input text */}
        <div className="left">
          <Select
            className="select"
            isLoading={store.isLoading}
            disabled={store.isLoading}
            value={sourceLang}
            onChange={(e) => setSourceLang(e)}
            options={store.languages}
          />
          <textarea
            placeholder="Enter text...."
            ref={areaRef}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        {/* Swap languages button */}
        <button className="change-btn" onClick={handleClick}>
          <FaRightLeft />
        </button>

        {/* Right column: Target language and translation result */}
        <div className="right">
          <Select
            className="select"
            isLoading={store.isLoading}
            disabled={store.isLoading}
            value={targetLang}
            onChange={(e) => setTargetLang(e)}
            options={store.languages}
          />
          <textarea
            placeholder="Translation will appear here..."
            disabled
            value={store.answer}
          ></textarea>
        </div>
      </div>

      {/* Translate button */}
      <button
        className="translate-btn"
        onClick={() => dispatch(getAnswer({ text, sourceLang, targetLang }))}
      >
        Translate
      </button>
    </>
  );
}
