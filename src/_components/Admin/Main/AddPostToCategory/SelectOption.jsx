import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../../../../firebasedatabase/firebase";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, category, theme) {
  return {
    fontWeight:
      category === name
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

export default function SelectOption({ setCategoryId, setCategory, category }) {
  const theme = useTheme();
  const [data, setData] = React.useState();
  const firestore = getFirestore(app);

  const fetchData = async () => {
    const collectionRef = collection(firestore, "categories");
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
    setData(data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(e.target.value);
    const selectedItem = data.find((item) => item.id === selectedCategory);
    if (selectedItem) {
      setCategoryId(selectedItem.id);
    }
  };

  return (
    <div className="w-full mt-2">
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-single-name-label">Category</InputLabel>
        <Select
          fullWidth
          labelId="demo-single-name-label"
          id="demo-single-name"
          value={category}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          <MenuItem value="" disabled>
            Please select a category
          </MenuItem>
          {data &&
            data.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
                style={getStyles(item.id, category, theme)}
              >
                {item.id}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
