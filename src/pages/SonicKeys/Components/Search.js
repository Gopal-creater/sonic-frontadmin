import React, { useEffect, useState } from "react";
import SearchImg from "../../../assets/images/search.png";
import "../../SonicKeys/css/search.css";
import CloseIcon from "@material-ui/icons/Close";

const Search = (props) => {
  const { searchData, dataSearch, setDataSearch, setDefaultData } = props;

  const searchDataList = (e) => {
    e.preventDefault();
    setDataSearch(e.target.value);
  };

  const handleSearch = () => {
    document.getElementById("inputID").style.display = "none";
    document.getElementById("closeID").style.display = "none";
    document.getElementById("searchID").style.display = "block";
    setDataSearch("");
    setDefaultData(true);
  };

  const enterPressed = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      searchData(dataSearch);
    }
  };

  const onSearch = () => {
    searchData(dataSearch);
  };
  return (
    <div style={{ display: "flex" }}>
      <CloseIcon
        fontSize={"medium"}
        style={{ cursor: "pointer", display: "none", color: "#ACACAC" }}
        id="closeID"
        className="closeIconSearch"
        onClick={handleSearch}
      />
      <div style={{ display: "none" }} id="inputID" className="searchBox">
        <input
          className="searchTxt"
          value={dataSearch}
          type="text"
          name=""
          placeholder="Type to Search"
          onChange={searchDataList}
          onKeyPress={enterPressed}
        />

        <a className="searchBtn">
          <img src={SearchImg} onClick={onSearch} />
        </a>
      </div>
      <img
        id="searchID"
        className="searchIconClick"
        src={SearchImg}
        style={{cursor:'pointer'}}
        onClick={() => {
          document.getElementById("inputID").style.display = "block";
          document.getElementById("closeID").style.display = "block";
          document.getElementById("searchID").style.display = "none";
        }}
      />
    </div>
  );
};

export default Search;
