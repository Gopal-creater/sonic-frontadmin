import React, { useEffect, useState } from 'react';
import SearchImg from "../../../assets/images/search.png";
import "../../SonicKeys/css/search.css";
import CloseIcon from '@material-ui/icons/Close';

const Search = (props) => {
    const { searchData, dataSearch, setDataSearch, setDefaultData } = props;

    // useEffect(() => {
        
    // },[props])

    const searchDataList = (e) => {
        e.preventDefault();
        setDataSearch(e.target.value);
    }

    const handleSearch = () => {
        one.style.display = 'none';
        two.style.display = 'none';
        three.style.display = 'block';
        setDataSearch("")
        setDefaultData(true);
    }

    const enterPressed = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) { //13 is the enter keycode
            searchData(dataSearch);
        }
    }

    const onSearch = () => {
        searchData(dataSearch);
    }
    let one = document?.getElementById('one');
    let two = document?.getElementById('two');
    let three = document?.getElementById('three');

    return (
        <div style={{ display: 'flex' }}>
            <CloseIcon fontSize={'medium'} style={{ display: 'none', color: '#ACACAC' }} id="two" className="closeIconSearch" onClick={handleSearch} />
            <div style={{ display: 'none' }} id="one" className="searchBox">

                <input className="searchTxt" value={dataSearch} type="text" name="" placeholder="Type to Search" onChange={searchDataList} onKeyPress={enterPressed} />

                <a href="#" className="searchBtn">
                    <img src={SearchImg} onClick={onSearch} />
                </a>
            </div>
            <img id="three" className="searchIconClick" src={SearchImg} onClick={() => {
                one.style.display = 'block';
                two.style.display = 'block';
                three.style.display = 'none';
            }} />
        </div>
    )
}
export default Search;