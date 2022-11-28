import Box from '@mui/material/Box';

import SelectCategories from './SelectCategories';

export default function CategoriesBox(props) {
  const { cats } = props;
  return (
    <div className="category-box">
      <Box>
      {cats && <SelectCategories categories={cats} />}
      </Box>
    </div>
  );
}