import Box from '@mui/material/Box';

import SelectCategories from './SelectCategories';

export default function CategoriesBox(props) {
  const { categories } = props;
  return (
    <div className="category-box">
      <Box>
       <SelectCategories categories={categories} />
      </Box>
    </div>
  );
}