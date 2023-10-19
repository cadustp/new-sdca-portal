import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { MoreVert } from '@material-ui/icons';
import { Checkbox, Menu, MenuItem } from '@material-ui/core/';

import { withStyles } from '@material-ui/core/styles';
import TableGenericRow from '../../../../components/TableGenericRow';
import { Evaluated, filterParams } from '../../../../redux/evaluateds/types';
import { light } from '../../../../styles/palette';

import '../styles.css';
import { captureEvent } from '../../../../analytics';

type Props = {
  intl: {
    messages: [],
    locale: string,
  }
};

type StateProps = {
  rowData: Evaluated,
  style: any,
  filterParams: filterParams,
  selectedEvaluatedsIds: Array<number>,
  action: string,
};

type DispatchProps = {
  openModal: Function,
  handleSelectOneEvaluated: Function,
  setSelectedEvaluatedsIds: Function,
  handleEditEvaluated: Function,
};

const MenuItemStyle = withStyles({
  root: {
    color: '#6A6A6A',
    fontSize: 12,
  },
})(MenuItem);

const TableRow: React.FC<Props & StateProps & DispatchProps> = ({
  intl,
  rowData,
  style,
  selectedEvaluatedsIds,
  action,
  openModal,
  handleSelectOneEvaluated,
  setSelectedEvaluatedsIds,
  handleEditEvaluated,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = event => {
    captureEvent('openEvaluatedMenu');
    setAnchorEl(event.currentTarget);
  };

  const handleActiveInactiveEvaluated = id => {
    handleCloseMenu();
    openModal(true);
    setSelectedEvaluatedsIds([id]);
  };

  const renderEvaluatedMenu = (evaluated, items) => (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
      PaperProps={{
        style: {
          padding: 0,
          transform: 'translateY(+20%)',
        },
      }}
    >
      {items.map(item => (
        (item.key === 'edit' && !evaluated.active) ? null
          : (
            <MenuItemStyle
              key={item.label}
              onClick={
            item.key === 'edit' ? () => {
              handleEditEvaluated(evaluated);
              captureEvent('openEditEvaluateds');
            } : () => {
              handleActiveInactiveEvaluated(evaluated.id);
              captureEvent('openActivateEvaluatedsMenu', { action: evaluated?.active ? 'inactivate' : 'activate' });
            }
          }
              style={{ color: light.gray.dark }}
            >
              {intl.messages[item.label] || item.label}
            </MenuItemStyle>
          )
      ))}
    </Menu>
  );

  const evaluatedMenuItems = [
    {
      label: 'evaluateds.edit',
      key: 'edit',
    },
    {
      label: action,
      key: 'activeInactive',
    },
  ];

  return (
    <TableGenericRow
      style={style}
      styleInner={{ cursor: 'auto' }}
    >
      <div className="row-container">
        <Checkbox
          color="primary"
          onChange={e => {
            handleSelectOneEvaluated(e, rowData.id);
            captureEvent('selectEvaluatedEvaluateds', { checked: e.target.checked });
          }}
          checked={selectedEvaluatedsIds?.includes(rowData.id)}
        />
        <p>{rowData.register}</p>
      </div>
      <div className="row-container">
        <p>{rowData.name}</p>
      </div>
      <div className="row-container">
        <p>{rowData.email}</p>
      </div>
      <div className="row-container">
        <p>{rowData.group.name}</p>
      </div>
      <div className="row-container centered">
        <MoreVert
          cursor="pointer"
          onClick={handleOpenMenu}
        />
      </div>
      {renderEvaluatedMenu(rowData, evaluatedMenuItems)}
    </TableGenericRow>
  );
};

export default injectIntl(TableRow);
