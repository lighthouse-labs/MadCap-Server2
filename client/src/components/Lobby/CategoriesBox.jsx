import { Fragment } from 'react';
import Box from '@mui/material/Box';

import SelectCategories from './SelectCategories';

export default function CategoriesBox(props) {
  const { categories } = props;
  return (
    <Fragment>
      <Box className="cat-box" sx={{width: '93%', p: 0}}>
       <SelectCategories categories={categories} currentCategories={props.currentCategories} setCurrentCategories={props.setCurrentCategories}/>
      </Box>
    </Fragment>
  );
}