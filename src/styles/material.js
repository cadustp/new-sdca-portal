import { createMuiTheme } from '@material-ui/core/styles';

import { light, text } from './palette';

const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: light.primary,
    },
    error: {
      main: light.error.dark,
    },
  },
  overrides: {
    MuiTooltip: {
      popper: {
        opacity: 1,
        zIndex: 1500,
      },
    },
    MuiDialog: {
      paper: {
        '&$paper': {
          padding: '24px 0px',
          'min-height': 'fit-content',
          'max-height': '80vh',
        },
      },
    },
    MuiDialogContent: {
      root: {
        '&$root': {
          padding: '8px 12px',
        },
      },
    },
    MuiTab: {
      root: {
        '&$root': {
          color: '#333333',
          'text-transform': 'none',
          fontSize: 14,
          'font-weight': 400,
          'min-width': '150px',
        },
        '&$disabled': {
          color: light.primary,
        },
        '&$selected': {
          color: light.primary,
        },
      },
    },
    MuiListItemText: {
      root: {
        '&$root': {
          color: '#3E3F40',
          'text-transform': 'none',
        },
      },
      primary: {
        '&$primary': {
          fontSize: '14px',
        },
      },
    },
    MuiCheckbox: {
      root: {
        color: light.primary,
        checked: {
          color: light.primary,
        },
      },
      colorSecondary: {
        color: light.info,
        '&$checked': {
          color: light.info,
        },
      },
    },
    MuiRadio: {
      root: {
        color: light.primary,
        checked: {
          color: light.primary,
        },
      },
      colorSecondary: {
        color: light.info,
        '&$checked': {
          color: light.info,
        },
      },
    },
    MuiButton: {
      root: {
        height: '30px',
        borderRadius: 50,
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '18px',
        textAlign: 'center',
        boxShadow: 'none',
        textTransform: 'none',
        '&$contained': {
          backgroundColor: light.primary,
          color: light.white,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: light.primaryDark,
          },
        },
        '&$outlined': {
          backgroundColor: light.white,
          color: light.primary,
          borderColor: light.primary,
        },
        '&$text': {
          backgroundColor: 'transparent',
          color: text.primary,
          borderColor: 'transparent',
          '&:hover': {
            color: light.primaryDark,
          },
        },
        '&:hover': {
          backgroundColor: light.primaryDark,
        },
        '&$disabled': {
          color: light.white,
          backgroundColor: light.disabled,
        },
      },
    },
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: `1px solid ${light.primary}`,
        },
        '&$error': {
          borderBottom: `1px solid ${light.error}`,
        },
      },
    },
    MuiFormLabel: {
      root: {
        '&$root': {
          fontSize: 14,
          color: text.primary,
        },
        '&$focused': {
          color: light.primary,
        },
        '&$error': {
          color: light.error,
        },
      },
    },
    MuiBadge: {
      badge: {
        width: 12,
        height: 12,
        backgroundColor: light.warn,
      },
    },
    MuiAvatar: {
      colorDefault: {
        backgroundColor: light.success,
      },
    },
  },
});

export default materialTheme;
