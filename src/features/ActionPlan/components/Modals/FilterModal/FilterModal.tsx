import React, { useState, useEffect } from 'react';
import {
  ListItem,
  Checkbox,
  TextField,
  IconButton,
  ListItemText,
  Divider,
} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
} from 'react-virtualized';
import {
  Container,
  HeaderFilter,
  StyledDivider,
  InformativeLabel,
  Footer,
  StyledButton,
  Title,
  StyledIconButton,
  SearchContainer,
  ListContainer,
} from './styles';
import { FilterModalTypes } from './index';
import { User } from '../../../../../redux/plans/duck';
import { captureEvent } from '../../../../../analytics';

export default function FilterModal({
  users,
  selectedUsers,
  filterUsers,
  closeFilterModal,
  intl,
}: FilterModalTypes): JSX.Element {
  users.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

  const [usersState, setUsersState] = useState<User[]>([]);
  const [filter, setFilter] = useState('');
  const [eventSent, setEventSent] = useState(false);

  useEffect(() => {
    const usersUpdated = users.map((user: User) => ({
      select: user.select || selectedUsers.includes(user.id),
      id: user.id,
      name: user.name,
    }));
    setUsersState(usersUpdated);
  }, [users]);

  const cache = new CellMeasurerCache({
    minHeight: 70,
    fixedWidth: true,
  });

  const updateCheckBox = (user, checked) => {
    setUsersState(
      usersState.map((selectedUser: User) => {
        if (user.id === selectedUser.id) {
          selectedUser.select = checked;
        }
        return selectedUser;
      }),
    );
  };

  const selectedItems = () => usersState.filter(user => user.select).map(user => user.id);

  const handleSearchChange = e => {
    setFilter(e.target.value);
    if (filter.length && !eventSent) {
      setTimeout(() => {
        captureEvent('searchEvaluatorPDA');
      }, 3000);
      setEventSent(true);
    }
  };

  const clearFilter = () => {
    setFilter('');
    setEventSent(false);
    captureEvent('clearSearchFieldPDA');
  };

  const countSelectedItems = () => usersState.filter(user => user.select).length;

  const handleFilter = () => {
    filterUsers(selectedItems());
    const selected = usersState.filter(user => user.select === true).length;
    captureEvent('setFilterPDA', { totalEvaluators: selected });
  };

  const handleCheckAll = checked => {
    captureEvent('selectAllEvaluatorsPDA', { checkAll: checked });
    setUsersState(usersState.map(user => ({
      ...user,
      select: checked,
    })));
  };

  const count = usersState.filter(u => u.name.toUpperCase().includes(filter.toUpperCase())).length;

  const virtualListRef = React.createRef();

  const renderItem = ({
    index, key, parent, style,
  }) => {
    const user = usersState.filter(u => u.name.toUpperCase().includes(filter.toUpperCase()))[index];
    return (
      <>
        {user.name.toUpperCase().includes(filter.toUpperCase()) && (
          <div key={user.id}>
            <CellMeasurer
              key={key}
              cache={cache}
              parent={parent}
              columnIndex={0}
              rowIndex={index}
            >
              <div key={key} style={style}>
                <ListItem>
                  <Checkbox
                    color="primary"
                    value={user.id}
                    onChange={event => {
                      const { checked }: any = event.target;
                      updateCheckBox(user, checked);
                      captureEvent('selectEvaluator', { selected: checked });
                    }}
                    checked={user.select}
                  />
                  <div>
                    <ListItemText primary={user.name} />
                  </div>
                </ListItem>
              </div>
            </CellMeasurer>
          </div>
        )}
      </>
    );
  };

  return (
    <Container>
      <Title>
        {intl.formatMessage({ id: 'filter_dialog.title' })}
        <StyledIconButton onClick={() => {
          closeFilterModal();
          captureEvent('closeFilterPDA');
        }}
        >
          <CloseIcon />
        </StyledIconButton>
      </Title>
      <HeaderFilter>
        <p>{intl.formatMessage({ id: 'action_plan.filter.responsibles' })}</p>
      </HeaderFilter>
      <StyledDivider />
      <InformativeLabel>
        {intl.formatMessage({ id: 'action_plan.filter.informative_label' })}
      </InformativeLabel>
      <SearchContainer>
        <TextField
          type="text"
          placeholder={intl.formatMessage({ id: 'action_plan.filter.name' })}
          onChange={handleSearchChange}
          value={filter}
          inputProps={{
            style: {
              width: '322px',
            },
          }}
        />
        <IconButton onClick={clearFilter}>
          <CloseIcon />
        </IconButton>
      </SearchContainer>
      <div>
        <ListItem>
          <Checkbox
            color="primary"
            value={usersState}
            onChange={e => handleCheckAll(e.target.checked)}
          />
          <div>
            <ListItemText
              primary={intl.formatMessage({
                id: 'action_plan.filter.select_all',
              })}
            />
          </div>
        </ListItem>
      </div>
      <Divider />
      <div>
        <ListContainer>
          <AutoSizer>
            {({ width, height }) => (
              <List
                ref={virtualListRef}
                width={width}
                height={height}
                rowHeight={70}
                rowCount={count}
                rowRenderer={renderItem}
              />
            )}
          </AutoSizer>
        </ListContainer>
      </div>
      <Footer>
        <span style={{ width: '100%' }}>
          <span>{countSelectedItems()}</span>
          <span>
            {intl.formatMessage({
              id: 'action_plan.filter.selected_items_count',
            })}
          </span>
        </span>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleFilter}
        >
          {intl.formatMessage({ id: 'filter_dialog.title' })}
        </StyledButton>
      </Footer>
    </Container>
  );
}
