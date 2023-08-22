import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../helpers/constant";

// Async thunk to fetch languages
export const getLanguages = createAsyncThunk("translate/getLang", async () => {
  // Fetch languages using axios and return processed data
  const res = await axios.get(
    "https://text-translator2.p.rapidapi.com/getLanguages",
    options
  );
  const languages = res.data.data.languages;
  const newLanguages = languages.map((lang) => ({
    value: lang.code,
    label: lang.name,
  }));

  return newLanguages; // Return processed language data
});

// Async thunk to fetch translation answer
export const getAnswer = createAsyncThunk(
  "translate/getAnswer",
  async (props) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", props.sourceLang.value);
    encodedParams.set("target_language", props.targetLang.value);
    encodedParams.set("text", props.text);

    // Configure request options
    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "f576273367msh2c7c39b4584137ap1384ffjsn79ed6dc0e38f",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    // Send request using axios and return translated answer
    const res = await axios.request(options);
    const answer = res.data.data.translatedText;

    return answer; // Return translated answer
  }
);
