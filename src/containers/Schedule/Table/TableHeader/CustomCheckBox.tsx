import React from 'react';
import { Checkbox } from '@mui/material';
import { makeStyles } from 'mui-styles';

const useStyles = makeStyles({
  root: {
    color: "#7540EE",
    "&$checked": {
      color: "#7540EE"
    }
  },
});

const CustomCheckBox = ({...props}) =>{
  const { root } = useStyles(props);
  return(
    <Checkbox className={`${root}`}  color="default" {...props} />
  )
}

export default CustomCheckBox;