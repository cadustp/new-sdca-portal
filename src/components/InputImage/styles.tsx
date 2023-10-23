import styled from 'styled-components'
import Box from '@mui/material/Box'
import { Theme, createStyles } from '@mui/material/styles';
import { makeStyles } from 'mui-styles';

export const SBoxImage = styled(Box)`
    border: 2px dashed ${props=> props.borderColor  ? 'var(--primary-color)' : 'black'} ;
    cursor:pointer
    transition:1s
    
`

export const SInputImages = styled.input `
    opacity:0
    position:absolute;
    bottom:-50px;

`

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 300,
      flexGrow: 1,
      minWidth: 300,
      transform: 'translateZ(0)',
      // The position fixed scoping doesn't work in IE 11.
      // Disable this demo to preserve the others.
      '@media all and (-ms-high-contrast: none)': {
        display: 'none',
      },
    },
    modal: {
      display: 'flex',
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
    },
    gridList: {
      width:'90%',
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
      paddingBottom: '0.6rem'
    },
     uploadImage:{
      border: '2px dashed black',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      cursor:'pointer',
      transition: 'border 0.5s ',
     " &:hover":{
        borderColor: 'var(--primary-color)'
      }
     },

     containerUploadImage: {
      width: '100%',
      minWidth: '105px',
      maxWidth: '222px',
     }
  }),
);
