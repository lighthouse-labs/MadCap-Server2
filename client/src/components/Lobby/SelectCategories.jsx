import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


export default function SelectCategories(props) {
  const { categories } = props;
  
  const [categoryName, setCategoryName] = useState([]);
  const theme = useTheme();
  
  const getStyles = (name, categoryName, theme) => {
    return {
      fontWeight:
      categoryName.indexOf(name) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
    };
  };
  
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
      );
    };

    const ITEM_HEIGHT = 88;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

  return (
    <FormControl sx={{ m: 1, width: '93%' }}
      className="select-categories">
      <InputLabel id="demo-multiple-chip-label">
        Categories
      </InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={categoryName}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value}
                sx={{
                }}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {categories && categories.map((cat) => (
          <MenuItem
            key={cat.id}
            value={cat.title}
            style={getStyles(cat.title, categoryName, theme)}
          >
            {cat.title}
          </MenuItem>
        ))}
      </Select>
      
    </FormControl>
  );
}