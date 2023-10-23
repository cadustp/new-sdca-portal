import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { makeStyles } from 'mui-styles';
import { LANGUAGE_OPTIONS } from '../../helpers/consts';
import CustomSnackbar from '../shared/CustomSnackbar/CustomSnackbar';
import Loading from '../Loading';

type Props = {
  intl: {
    messages: Array<any>;
    locale: string,
  };
};

type StateProps = {
  language: string,
  error: boolean,
  isLoading: boolean,
  errorMessage: string,
};

type DispatchProps = {
  setLanguageRequest: Function,
  clearLanguageErrors: Function,
};

const MenuItemStyle = (props: any) => {
  const classes = makeStyles((theme: any) => ({
    root: {
      color: '#6A6A6A',
      fontSize: 12,
      paddingTop: 8,
      paddingDown: 8,
      paddingLeft: 16,
      paddingRight: 16,
    }
  }));

  return (
    <MenuItem classes={{ ...classes }} {...props} />
  )
}

const LanguagePicker: React.FC<Props & StateProps & DispatchProps> = ({
  intl,
  language,
  isLoading,
  error,
  errorMessage,
  clearLanguageErrors,
  setLanguageRequest,
}) => {
  const [settingsAnchor, setSettingsAnchor] = useState(null);

  const handleClick = (event: any) => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setSettingsAnchor(null);
  };

  const handleLanguage = (item: any) => {
    setLanguageRequest(item);
  };

  const LoadingState = () => (isLoading ? <Loading size="small" /> : <></>);

  return (
    <>
      <LoadingState />

      <div className="user-language">
        <div className="icon">
          <Button
            aria-haspopup="true"
            onClick={handleClick}
          >
            {intl.locale.toUpperCase()}
          </Button>
        </div>
        <Menu
          id="language"
          anchorEl={settingsAnchor}
          open={Boolean(settingsAnchor)}
          onClose={handleClose}
          PaperProps={{
            style: {
              padding: 0,
              transform: 'translateY(+20%)',
            },
          }}
        >
          {LANGUAGE_OPTIONS.LANGUAGES.map(item => (
            <MenuItemStyle
              key={item.value}
              onClick={() => handleLanguage(item.value)}
            >
              {intl.messages[item.label]}
            </MenuItemStyle>
          ))}
        </Menu>
      </div>
      <CustomSnackbar
        data={{
          message: errorMessage,
          type: 'error',
          open: error,
        }}
        handleClose={clearLanguageErrors}
      />
    </>
  );
};

export default LanguagePicker;
