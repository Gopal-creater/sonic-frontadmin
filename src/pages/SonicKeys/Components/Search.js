import React from 'react';
import SearchImg from "../../../assets/images/search.png";
import "../../SonicKeys/css/search.css";

const Search = (props) => {
    const { searchData, dataSearch, setDataSearch } = props;

    const searchDataList = (e) => {
        e.preventDefault();
        setDataSearch(e.target.value);
    }

    const onSearch = () => {
        searchData(dataSearch);
    }

    return (
        <div>
            <div className="searchBox">
                <input className="searchTxt" value={dataSearch} type="text" name="" placeholder="Type to Search" onChange={searchDataList} />
                <a href="#" className="searchBtn">
                    <img src={SearchImg} onClick={onSearch} />
                </a>
            </div>
        </div>
    )
}
export default Search;