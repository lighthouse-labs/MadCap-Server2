import { Fragment } from 'react';
import Box from '@mui/material/Box';

import SelectCategories from './SelectCategories';

export default function CategoriesBox(props) {
  const { categories } = props;
  return (
    <Fragment>
      <Box>
       <SelectCategories categories={categories} />
      </Box>
    </Fragment>
  );
}