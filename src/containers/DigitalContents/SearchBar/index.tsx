import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Input, Menu } from '@mui/material';
import { SearchOutlined, FormatLineSpacing } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/material/styles';
import { light } from '../../../styles/palette';
import { ORDER_TYPES } from '../../../helpers/consts';

import Button from '../../../components/Button';
import '../styles.css';
import { captureEvent } from '../../../analytics';

type Props = {
  intl: {
    messages: [];
  };
  searchValue: string,
  sortType: string,
};

type StateProps = {
};

type DispatchProps = {
  setSearchValue: Function,
  handleSearch: Function,
  setSortType: Function,
};

const MenuItemStyle = makeStyles({
  root: {
    color: '#6A6A6A',
    fontSize: 12,
  },
})(MenuItem);

const sortItems = [
  {
    label: 'contents.nameAscending',
    sort: ORDER_TYPES.ALPHABETICAL_ASCENDING,
  },
  {
    label: 'contents.nameDescending',
    sort: ORDER_TYPES.ALPHABETICAL_DESCENDING,
  },
  {
    label: 'contents.creationDateAscending',
    sort: ORDER_TYPES.CREATION_DATE_ASCENDING,
  },
  {
    label: 'contents.creationDateDescending',
    sort: ORDER_TYPES.CREATION_DATE_DESCENDING,
  },
];

const SearchBar: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  handleSearch,
  searchValue,
  setSearchValue,
  sortType,
  setSortType,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSort = sortType => {
    setSortType(sortType);
    setAnchorEl(null);
    captureEvent('sortContents', { sort: sortType });
  };

  const searchContents = () => {
    handleSearch();
    captureEvent('searchContents');
  };

  const renderSortMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      PaperProps={{
        style: {
          padding: 0,
          transform: 'translateY(+20%)',
        },
      }}
    >
      {sortItems.map(item => (
        <MenuItemStyle
          style={{
            color: (item.sort === sortType ? light.primaryDark : light.gray.dark),
            backgroundColor: (item.sort === sortType ? light.primaryLight : light.white),
          }}
          key={item.sort}
          onClick={() => handleSort(item.sort)}
        >
          {intl.messages[item.label]}
        </MenuItemStyle>
      ))}
    </Menu>
  );

  return (
    <>
      <div className="dc-search-container">
        <div className="search-bar">
          <Input
            className="search-input"
            autoFocus
            onKeyPress={e => { e.key === 'Enter' && searchContents(); }}
            onChange={event => setSearchValue(event.target.value)}
            value={searchValue}
            disableUnderline
            placeholder={`${intl.messages['contents.searchContents']}`}
          />
          <div>
            <SearchOutlined className="searchIcon" onClick={() => searchContents()} />
          </div>
        </div>
        <div className="separator" />
        <div className="button-container">
          <Button
            fullWidth
            variant="text"
            onClick={event => {
              setAnchorEl(event.currentTarget);
              captureEvent('openSortContents');
            }}
            disableRipple
          >
            <FormatLineSpacing />
            <p>{intl.messages['contents.sortList']}</p>
          </Button>
        </div>
        {renderSortMenu}
      </div>
    </>
  );
};

export default injectIntl(SearchBar);
