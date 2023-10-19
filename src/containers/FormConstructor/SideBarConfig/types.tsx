import { Form } from 'src/redux/forms/types';

export type Props = {
    intl: {
      messages: [];
    };
  };
  
export type StateProps = {
    open: boolean,
    showSideBar: boolean,
    forms: [],
    form: Form,
    isNew: boolean,
    shareMode: string,
    availableUsers: [],
    loadingLists: boolean,
    loadFailure: boolean,
  };
  
 export type DispatchProps = {
    onClose: Function;
    listsDataRequest: Function;
    setFormSettings: Function;
    clearFormSettings: Function;
    handleShareMode: Function;
    loadAvailableUsers: Function;
    clearLoadUsersStatus: Function;
  };