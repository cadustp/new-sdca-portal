import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import Filter from './Filter';
import {
  DataFilters,
  setFilterDirty,
  setSelectedFilter,
  SetSelectedFilter,
} from '../../../../../redux/app/filters/duck';
import { FilterTabs } from '../../../../../helpers/consts';
import { Intl } from '../../../../../helpers/types';
import { getForms } from '../../../../../redux/app/filters/selectors';

type StateProps = {
  selectedGroups: Record<string, boolean>;
  selectedForms: Record<string, boolean>;
  selectedEmployees: Record<string, boolean>;
  selectedAppUsers: Record<string, boolean>;
  groups: any[];
  employees: any[];
  appUsers: any[];
  forms: any[];
  isFilterDirty: boolean;
};

type ReduxStateProps = StateProps & DataFilters;

type DispatchProps = {
  setSelectedFilter: ({ content, filter }: SetSelectedFilter) => void;
  setFilterDirty: () => void;
};

type OwnProps = {
  enabledTabs: FilterTabs[];
  tabs: FilterTabs[];
  isOpen: boolean;
  isFormRadioButton?: boolean;
  onClose: () => void;
  intl: Intl;
  callBack: (values) => void;
};

export type FilterProps = ReduxStateProps & DispatchProps & OwnProps;

const mapStateToProps = state => ({
  selectedGroups: state.filters.data.groups,
  selectedForms: state.filters.data.forms,
  selectedEmployees: state.filters.data.employees,
  selectedAppUsers: state.filters.data.appUsers,
  forms: getForms(state),
  isFilterDirty: state.filters.data.isFilterDirty,
});

const mapDispatchToProps = dispatch => ({
  setSelectedFilter: ({ filter, content }) =>
    dispatch(setSelectedFilter({ filter, content })),
  setFilterDirty: () => dispatch(setFilterDirty()),
});

export default injectIntl<ReduxStateProps, DispatchProps, OwnProps>(
  connect(mapStateToProps, mapDispatchToProps)(Filter),
);
