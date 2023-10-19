import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Input, Menu, MenuItem } from '@mui/material';
import { Search, FormatLineSpacing, Clear } from '@mui/icons-material';
import Button from '../../../components/Button';
import { captureEvent } from '../../../analytics';
import { ORDER_TYPES } from '../../../helpers/consts';

import '../styles.css';

type Props = {
  intl: {
    messages: [];
  };
};

type DispatchProps = {
  onSearch: Function,
  onFilter: Function,
};

const SearchBar: React.FC<Props & DispatchProps> = ({
  intl,
  onSearch,
  onFilter,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderType, setOrderType] = useState('');

  const handleFilter = type => {
    setAnchorEl(null);
    onFilter(type);
  };

  useEffect(() => {
    if (orderType) {
      handleFilter(orderType);
    }
  }, [orderType]);

  const handleSearch = e => {
    captureEvent('searchRoutines', { enterkey: e.key === 'Enter' });
    onSearch(searchTerm);
  };

  const handleClear = e => {
    setSearchTerm('');
    onSearch('');
  };
  const sortItems = [
    {
      label: 'routines.orderListButton.alphabeticalAtoZ',
      sort: ORDER_TYPES.ALPHABETICAL_ASCENDING,
    },
    {
      label: 'routines.orderListButton.alphabeticalZtoA',
      sort: ORDER_TYPES.ALPHABETICAL_DESCENDING,
    },
  ];

  const renderOrderMenu = (
    <Menu
      id="order-dropdown"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      PaperProps={{
        style: {
          padding: 0,
          transform: 'translate(1%, 31%)',
        },
      }}
      MenuListProps={{
        style: {
          padding: 0,
        },
      }}
    >
      {sortItems.map(item => (
        <MenuItem
          className="routine-menu-item"
          key={item.sort}
          onClick={() => {
            setOrderType(item.sort);
            captureEvent('orderRoutines', { orderType: item.sort });
          }}
        >
          {intl.messages[item.label]}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <>
      <div className="search-routine-container">
        <div className="search-routine-section">
          <Input
            className="search-routine-input"
            value={searchTerm}
            onKeyPress={e => { if (e.key === 'Enter') { handleSearch(e); } }}
            autoFocus
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={`${intl.messages['routines.searchBar.placeholder']}`}
            disableUnderline
          />
          {searchTerm && <Clear className="search-routine-icon" onClick={handleClear} />}
          <Search className="search-routine-icon" onClick={handleSearch} />
        </div>
        <div className="sf-separator" />
        <div className="sf-button-container">
          <Button
            aria-owns={anchorEl ? 'order-dropdown' : undefined}
            disableRipple
            fullWidth
            variant="text"
            onClick={e => {
              setAnchorEl(e.currentTarget);
              captureEvent('openOrderRoutinesMenu');
            }}
          >
            <FormatLineSpacing />
            {intl.messages['routines.orderListButton.name']}
          </Button>
        </div>
        {renderOrderMenu}
      </div>
    </>
  );
};

export default injectIntl(SearchBar);
