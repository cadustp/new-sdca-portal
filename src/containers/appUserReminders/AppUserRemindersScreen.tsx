import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { OuterContainer } from '../Reports/styles';
import { AppUserReminders } from '../../redux/appUserReminders/types';
import Header from './Header';
import Section from './Section';

type propTypes = {
  forms: Array<any>,
  valuatedUsers: Array<any>,
  sideFilterParams: {};
  searchAppUserRemindersRequest: Function;
  searchLoading: Function;
  failure: boolean;
  reminders: {
    data: Array<AppUserReminders>;
    pagination: {
      total: number;
      links: [];
    };
  };
  intl: {
    messages: [];
  };
  loadingLists: boolean,
  clearReminderAnswers: Function;
  listsDataRequest: Function,
};

const AppUserRemindersScreen = ({
  searchAppUserRemindersRequest,
  searchLoading,
  reminders,
  failure,
  sideFilterParams,
  clearReminderAnswers,
  listsDataRequest,
  forms,
  valuatedUsers,
  loadingLists,
}: propTypes): JSX.Element => {
  const [valueInputSearch, setValueInputSearch] = useState<string>('');
  const handleSearch = (params = sideFilterParams, inputText = '', page = 1) => {
    const searchParams = {
      ...params,
      inputText,
    };
    searchAppUserRemindersRequest({
      params: searchParams,
      paginate: true,
      page,
    });
  };

  useEffect(() => {
    handleSearch();
    clearReminderAnswers();
  }, []);

  const LoadingState = () => (searchLoading || loadingLists ? <Loading size="small" /> : <></>);

  return (
    <OuterContainer>
      <Header
        reminders={reminders}
        searchAppUserRemindersRequest={searchAppUserRemindersRequest}
        searchLoading={searchLoading}
        setValueInputSearch={setValueInputSearch}
        valueInputSearch={valueInputSearch}
        handleSearchRequest={() => { handleSearch(sideFilterParams, valueInputSearch); }}
        listsDataRequest={listsDataRequest}
        forms={forms}
        valuatedUsers={valuatedUsers}
      />
      <LoadingState />
      <Section
        reminders={reminders}
        searchAppUserRemindersRequest={searchAppUserRemindersRequest}
        searchLoading={searchLoading}
        handleSearch={handleSearch}
        sideFilterParams={sideFilterParams}
        valueInputSearch={valueInputSearch}
        failure={failure}
      />
    </OuterContainer>
  );
};

export default AppUserRemindersScreen;
