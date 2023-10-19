import React, { useState } from 'react';
import { injectIntl } from 'react-intl';

import Skeleton from 'react-loading-skeleton';
import Button from '../../../components/Button';
import FilterIcon from '../../../components/shared/Icons/FilterIcon';
import RemindersSideFiltersScreen from '../../RemindersSideFilters';

import {
  Container,
  SearchBarContainer,
  SearchBar,
  StyledInput,
  Separator,
  ButtonStyledContainer,
  StyledIconContainer,
  SkeletonButtonWrapper,
} from '../../Reports/styles';

import SearchIcon from '../../../components/shared/Icons/SearchIcon';
import { captureEvent } from '../../../analytics';

type Props = {
  forms: Array<any>,
  valuatedUsers: Array<any>,
  handleSearchRequest: Function,
  searchAppUserRemindersRequest:Function;
  searchLoading: Function;
  intl: {
    messages:[]
  };
  valueInputSearch: string;
  setValueInputSearch: Function;
  listsDataRequest: Function,
};

const Header: React.FC<Props> = ({
  intl,
  searchLoading,
  valueInputSearch,
  setValueInputSearch,
  handleSearchRequest,
  listsDataRequest,
  forms,
  valuatedUsers,
}) => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const handleSearch = e => {
    captureEvent('searchReminders', { enterKey: e.key === 'Enter' });
    handleSearchRequest();
  };

  const handleLoadFilter = () => {
    captureEvent('openFilterReminders');
    const hasData = forms.length
      && valuatedUsers.length;
    if (!hasData) {
      const requestParams = {
        forms: true,
        evaluateds: true,
      };
      listsDataRequest(requestParams);
    }
    setOpenFilter(true);
  };

  return (
    <>
      <RemindersSideFiltersScreen
        open={openFilter}
        forms={forms}
        valuatedUsers={valuatedUsers}
        onClose={() => setOpenFilter(false)}
      />
      <Container>
        <SearchBarContainer>
          <SearchBar>
            {searchLoading ? (
              <Skeleton width={400} />
            ) : (
              <>
                <StyledInput
                  autoFocus
                  onKeyPress={e => { if (e.key === 'Enter') { handleSearch(e); } }}
                  onChange={event => setValueInputSearch(event.target.value)}
                  value={valueInputSearch}
                  placeholder={`${intl.messages['reports.search_label']}`}
                />
                <StyledIconContainer onClick={handleSearch}>
                  <SearchIcon />
                </StyledIconContainer>
              </>
            )}
          </SearchBar>
          <Separator />
          <ButtonStyledContainer>
            {searchLoading ? (
              <SkeletonButtonWrapper>
                <Skeleton width={100} />
              </SkeletonButtonWrapper>
            ) : (
              <Button
                fullWidth
                variant="text"
                onClick={handleLoadFilter}
                disableRipple
              >
                <FilterIcon />
                <p>{intl.messages['reports.filter_label']}</p>
              </Button>
            )}
          </ButtonStyledContainer>
        </SearchBarContainer>
      </Container>
    </>
  );
};

export default injectIntl(Header);
