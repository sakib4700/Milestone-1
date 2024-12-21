import { useState } from "react";
import "./searchbar.css";
import { TextField } from "@mui/material";
// import useDebounce from "../../hooks/useDebounce";
const SearchBar = ({ setFilterList, products }) => {
  const [searchWord, setSearchWord] = useState(null);
  // const debounceSearchWord = useDebounce(searchWord, 300);
  const handelChange = (input) => {
    let searchWord = input.target.value;
    setSearchWord(searchWord);
    setFilterList(
      products.filter((item) =>
        item.title?.toLowerCase().includes(searchWord?.toLowerCase())
      )
    );
  };
  return (
    <div
      className="search-container w-100 "
      style={{
        padding: "10px",
        margin: "10px",
        width: "100%",
      }}
    >
      <ion-icon name="search-outline" className="search-icon"></ion-icon>
      <TextField
        type="search"
        variant="standard"
        autoFocus
        fullWidth
        sx={{ border: "none" }}
        placeholder="Search..."
        onChange={handelChange}
      ></TextField>
    </div>
  );
};

export default SearchBar;
