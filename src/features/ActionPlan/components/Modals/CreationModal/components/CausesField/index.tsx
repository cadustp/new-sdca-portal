import React from 'react';
import { injectIntl } from 'react-intl';
import { Button } from '@mui/material';

import { StyledTextField } from '../../../../../../../components/shared/Inputs/StyledInput';
import { FormDescriptionMaxLength } from '../../../../../../../helpers/consts';
import { TrashIcon } from '../../../../../../../components/shared/Icons';

import { Intl } from '../../../../../../../helpers/types';

type Props = {
  hasError: boolean;
  isDisabled: boolean;
  causes: [];
  onBlur: (value) => void;
  onDelete: () => void;
  intl: Intl;
  defaultValue?: string;
};

function CausesField({
  causes,
  onBlur,
  onDelete,
  hasError,
  intl,
  defaultValue, isDisabled
}: Props) {
  return (
    <div id={Math.random().toString()} className="add-more">
      <StyledTextField
        disabled={isDisabled}
        noErrorMessage
        error={hasError}
        style={{ marginBottom: 8 }}
        type="text"
        inputProps={{
          maxLength: FormDescriptionMaxLength,
        }}
        onBlur={onBlur}
        placeholder={intl.formatMessage({
          id: 'action_plan.create.causes.placeholder',
        })}
        defaultValue={defaultValue}
      />
      {causes.length > 1 ? (
        <Button disableTouchRipple onClick={onDelete}>
          <TrashIcon size={24} />
        </Button>
      ) : null}
    </div>
  );
}

export default injectIntl(React.memo(CausesField));
