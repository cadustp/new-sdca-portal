import React, { useState } from 'react';
import IconButton from '@mui/material/Icon';
import { connect } from 'react-redux';

import Filter from './components/Filter';
import { FilterTabs } from '../../../helpers/consts';
import { setTrainingFormsInclusion as setTrainingFormsInclusionAction } from '../../../redux/actions/form-actions';
import { captureEvent } from '../../../analytics';

type Props = {
  setTrainingFormsInclusion: (includeTraining: boolean) => void;
  includeTraining: boolean;
  filterIcon: JSX.Element;
  callBack: () => void;
  isFormRadioButton: boolean;
  enabledTabs: FilterTabs[];
};
function NewFilter({
  filterIcon,
  callBack,
  enabledTabs,
  isFormRadioButton,
  setTrainingFormsInclusion,
  includeTraining,
}: Props) {
  const [isFilterDialogOpen, setFilterDialogOpen] = useState(false);

  function openFilter() {
    captureEvent('openFilterAdherence');
    setTrainingFormsInclusion(includeTraining);
    setFilterDialogOpen(true);
  }

  function onClose() {
    setFilterDialogOpen(false);
  }

  return (
    <div className="group-filter">
      <form>
        <IconButton className="filterIconButton" onClick={openFilter}>
          {filterIcon}
        </IconButton>
      </form>
      <Filter
        isOpen={isFilterDialogOpen}
        onClose={onClose}
        callBack={callBack}
        enabledTabs={enabledTabs}
        isFormRadioButton={isFormRadioButton}
      />
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  setTrainingFormsInclusion: include => dispatch(setTrainingFormsInclusionAction(include)),
});

export default connect(null, mapDispatchToProps)(NewFilter);
