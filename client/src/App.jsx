/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [inputText, setInputText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    searchFromServer(inputText);
  }, [inputText]);

  const searchFromServer = async (text) => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${text}`
    );
    console.log(result);
    setSearchResult(result.data.data);
  };

  return (
    <div className="App">
      <header>
        <h1>เที่ยวไหนดี</h1>
        <p className="search">ค้นหาที่เที่ยว</p>
        <input
          type="text"
          onChange={(event) => {
            setInputText(event.target.value);
          }}
          value={inputText}
          placeholder="หาที่เที่ยวแล้วไปกัน..."
        />
      </header>
      {searchResult.length > 0 && (
        <>
          {searchResult.map((item) => {
            return (
              <div key={item.eid} className="triplist">
                <img
                  src={item.photos[0]}
                  css={css`
                    padding: 16px;
                    height: 250px;
                    border-radius: 40px;
                  `}
                />
                <div className="tripinfomation">
                  <h2>{item.title}</h2>
                  <p className="description">{item.description}</p>
                  <a href={item.url} target="_blank">
                    อ่านต่อ
                  </a>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default App;
