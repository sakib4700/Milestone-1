import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#0f3460",
    color: "white",
    borderRadius: "5px",
    border: "none",
    boxShadow: "none",
    width: "200px",
    height: "40px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#0f3460" : "white",
    color: state.isSelected ? "white" : "#0f3460",
    "&:hover": {
      backgroundColor: "#0f3460",
      color: "white",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
};

const FilterSelect = ({ setFilterList, products, categories }) => {
  const [selected, setSelected] = useState(null);
  const handleChange = (e) => {
    setSelected(e.target.value);
    console.log(e.target.value);
    setFilterList(
      products.filter((item) =>
        e.target.value != "All"
          ? item?.category_id?._id == e.target.value
          : products
      )
    );
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Filter By Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={handleChange}
        label="Filter By Category"
        value={selected} // Pass selected as the value prop
      >
        <MenuItem value={"All"}>All</MenuItem>
        {categories?.map((category, index) => (
          <MenuItem key={index} value={category?._id}>
            {category?.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
