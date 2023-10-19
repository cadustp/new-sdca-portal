import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Input, Menu, MenuItem } from '@material-ui/core';
import { Search, FormatLineSpacing, Clear } from '@material-ui/icons';
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
    captureEvent('searchFormForms', { enterkey: e.key === 'Enter' });
    onSearch(searchTerm);
  };

  const handleClear = e => {
    setSearchTerm('');
    onSearch('');
  };

  const sortItems = [
    {
      label: 'forms.orderListButton.alphabeticalAtoZ',
      sort: ORDER_TYPES.ALPHABETICAL_ASCENDING,
    },
    {
      label: 'forms.orderListButton.alphabeticalZtoA',
      sort: ORDER_TYPES.ALPHABETICAL_DESCENDING,
    },
    {
      label: 'forms.orderListButton.creationDateRecent',
      sort: ORDER_TYPES.CREATION_DATE_ASCENDING,
    },
    {
      label: 'forms.orderListButton.creationDateOldest',
      sort: ORDER_TYPES.CREATION_DATE_DESCENDING,
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
          className="form-menu-item"
          key={item.sort}
          onClick={() => {
            setOrderType(item.sort);
            captureEvent('orderForms', { orderType: item.sort });
          }}
        >
          {intl.messages[item.label]}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <>
      <div className="search-form-container">
        <div className="search-form-section">
          <Input
            className="search-form-input"
            value={searchTerm}
            onKeyPress={e => { if (e.key === 'Enter') { handleSearch(e); } }}
            autoFocus
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={`${intl.messages['forms.searchBar.placeholder']}`}
            disableUnderline
          />
          {searchTerm && <Clear className="search-form-icon" onClick={handleClear} />}
          <Search className="search-form-icon" onClick={handleSearch} />
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
              captureEvent('openOrderFormsMenu');
            }}
          >
            <FormatLineSpacing />
            {intl.messages['forms.orderListButton.name']}
          </Button>
        </div>
        {renderOrderMenu}
      </div>
    </>
  );
};

export default injectIntl(SearchBar);
