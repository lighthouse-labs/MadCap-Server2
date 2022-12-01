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
  const { currentCategories, setCurrentCategories } = props;

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
    console.log(event)
    const {
      target: { value },
    } = event;
    setCurrentCategories(
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
        width: 208,
      },
    },
  };

  console.log("Categories", categories);
  // console.log("Category IDs", currentCategories)

  const CategoryIDToValue = ((cat_id) => categories.find((category) => category.id === cat_id).title);

  return (
    <FormControl sx={{ m: 1, width: '100%' }}
      className="select-categories">
      <InputLabel id="multiple-chip-label">
        Categories
      </InputLabel>
      <Select
        labelId="multiple-chip-label"
        id="multiple-chip"
        multiple
        value={currentCategories}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip"
        />}
        renderValue={(selected) => (
          <Box sx={{
            display: 'flex', flexWrap: 'wrap',
            gap: 0, '& .MuiChip-root':
              { fontSize: '12px' }
          }}
          >
            {selected.map((value) => (
              <Chip key={value} label={CategoryIDToValue(value)}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {categories && categories.map((cat) => (
          <MenuItem
            key={cat.id}
            value={cat.id}
            style={getStyles(cat.title, currentCategories, theme)}
          >
            {cat.title}
            {console.log("Cat", cat)}
          </MenuItem>
        ))}
      </Select>

    </FormControl>
  );
}