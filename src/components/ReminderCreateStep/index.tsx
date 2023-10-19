import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import {
  Box,
  Input,
  Tooltip,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import { DateTimePicker, DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from '../../timezones/moment';
import SelectInput from '../v2/SelectInput';
import StepperCard from '../StepperCard';
import { formatDataSet, translateLabels } from '../../helpers/utils';
import { RECURRENCE_OPTIONS, REMINDER_MINIMAL_DATE } from '../../helpers/consts';
import './styles.css';
import 'moment/locale/pt-br';
import 'moment/locale/es';

type Props = {
  intl: {
    messages: Array<any>;
    locale: string,
  };
  reminderData: {
    name: string,
    form: number,
    evaluators: [],
    evaluateds: [],
    evaluatorsGroups: [],
    evaluatedsGroups: [],
    recurrence: {
      id: null,
      label: '',
      key: null,
    },
    startDate: string,
    endDate: string,
    deadline: string,
    weekDays: [],
    automaticScheduling: boolean,
  };
  isARoutine: boolean,
};

type StateProps = {
  reminder: {
    id: number,
    name: string,
    form: {
      id: null,
      name: '',
    },
    evaluators: Array<any>,
    evaluateds: Array<any>,
    evaluatorsGroups: Array<any>,
    evaluatedsGroups: Array<any>,
    recurrence: {
      id: null,
      name: '',
    },
    startDate: string,
    endDate: string,
    deadline: string,
    weekDays: Array<any>,
    automaticScheduling: boolean,
  },
  formsList: [],
  evaluatorsList: [],
  evaluatedsList: [],
  groupsList: [],
};

type DispatchProps = {
  setReminderData: Function,
};

const Field = ({
  children,
  title,
  tooltip = '',
}) => (
  <div className="reminder-field-container">
    <p style={{ display: 'flex', alignItems: 'center' }}>
      {title}
      {tooltip.length
        ? (
          <Tooltip
            title={tooltip}
          >
            <InfoOutlined
              style={{ marginLeft: '5px' }}
              fontSize="small"
            />
          </Tooltip>
        )
        : null }
    </p>
    <div className="reminder-field-input">
      {children}
    </div>
  </div>
);

const ReminderCreateStep: React.FC<Props & StateProps & DispatchProps> = ({
  intl,
  reminder,
  reminderData,
  setReminderData,
  formsList,
  evaluatorsList,
  evaluatedsList,
  groupsList,
  isARoutine,
}) => {
  const setLocale = () => {
    switch (intl.locale) {
      case 'en':
        moment.locale('en-us');
        break;
      case 'es':
        moment.locale('es');
        break;
      case 'pt-BR':
      default:
        moment.locale('pt-br');
    }
  };

  const loadReminder = () => {
    window.scrollTo(0, 0);
    setReminderData({
      ...reminderData,
      id: reminder.id,
      name: reminder.name,
      form: formsList ? formatDataSet(formsList).filter(form => form.value === reminder.form.id)?.[0] : [],
      evaluators: evaluatorsList && reminder.evaluators
        ? formatDataSet(evaluatorsList)
          .filter(evaluator => reminder.evaluators
            .some(e => e.id === evaluator.value)) : [],
      evaluateds: evaluatedsList && reminder.evaluateds
        ? formatDataSet(evaluatedsList)
          .filter(evaluated => reminder.evaluateds
            .some(e => e.id === evaluated.value)) : [],
      evaluatorsGroups: groupsList && reminder.evaluatorsGroups
        ? formatDataSet(groupsList)
          .filter(group => reminder.evaluatorsGroups
            .some(g => g.id === group.value)) : [],
      evaluatedsGroups: groupsList && reminder.evaluatedsGroups
        ? formatDataSet(groupsList)
          .filter(group => reminder.evaluatedsGroups
            .some(g => g.id === group.value)) : [],
      recurrence: reminder.recurrence
        ? translateLabels(intl, RECURRENCE_OPTIONS.RECURRENCE)
          .filter(recurrence => recurrence.value === reminder.recurrence)?.[0] : null,
      startDate: moment(reminder.startDate),
      endDate: moment(reminder.endDate),
      deadline: reminder.deadline ? moment(reminder.deadline) : null,
      weekDays: reminder.weekDays
        ? translateLabels(intl, (RECURRENCE_OPTIONS.WEEK_DAYS
          .filter(day => reminder.weekDays
            .some(d => d.id === day.id)))) : [],
      automaticScheduling: reminder.automaticScheduling ?? false,
    });
  };

  const isDisabled = (!!reminder?.id && !isARoutine);

  useEffect(() => {
    if (reminder?.id) {
      loadReminder();
    }
    setLocale();
  }, [reminder, formsList]);
  return (
    <>
      <Box className="reminder-step-container">
        <StepperCard
          title={intl.messages['reminder.edit.step.one']}
        >
          <>
            <div className="row-fields">
              <Field
                title={intl.messages['reminder.edit.field.name']}
              >
                <Input
                  onChange={event => setReminderData({ ...reminderData, name: event.target.value })}
                  value={reminderData.name}
                  placeholder={intl.messages['reminder.edit.field.name.placeholder']}
                  fullWidth
                  disableUnderline
                />
              </Field>
              <Field
                title={intl.messages['reminder.edit.field.form']}
              >
                <SelectInput
                  setSelectedItems={selectedItem => setReminderData({ ...reminderData, form: selectedItem })}
                  selectedItems={reminderData.form}
                  placeholder={intl.messages['reminder.edit.field.form.placeholder']}
                  items={formatDataSet(formsList)}
                />
              </Field>
            </div>
          </>
        </StepperCard>
        <StepperCard
          title={intl.messages['reminder.edit.step.two']}
        >
          <>
            <div className="row-fields">
              <Field
                title={intl.messages['reminder.edit.field.evaluators']}
              >
                <SelectInput
                  setSelectedItems={selectedItem => setReminderData({ ...reminderData, evaluators: selectedItem })}
                  selectedItems={reminderData.evaluators}
                  placeholder={intl.messages['reminder.edit.field.evaluators.placeholder']}
                  items={formatDataSet(evaluatorsList)}
                  isMulti
                />
              </Field>
              <Field
                title={intl.messages['reminder.edit.field.evaluatorsGroups']}
              >
                <SelectInput
                  setSelectedItems={selectedItem => setReminderData({ ...reminderData, evaluatorsGroups: selectedItem })}
                  selectedItems={reminderData.evaluatorsGroups}
                  placeholder={intl.messages['reminder.edit.field.evaluatorsGroups.placeholder']}
                  items={formatDataSet(groupsList)}
                  isMulti
                />
              </Field>
            </div>
            <div className="row-fields">
              <Field
                title={intl.messages['reminder.edit.field.evaluateds']}
              >
                <SelectInput
                  setSelectedItems={selectedItem => setReminderData({ ...reminderData, evaluateds: selectedItem })}
                  selectedItems={reminderData.evaluateds}
                  placeholder={intl.messages['reminder.edit.field.evaluateds.placeholder']}
                  items={formatDataSet(evaluatedsList)}
                  isMulti
                />
              </Field>
              <Field
                title={intl.messages['reminder.edit.field.evaluatedsGroups']}
              >
                <SelectInput
                  setSelectedItems={selectedItem => setReminderData({ ...reminderData, evaluatedsGroups: selectedItem })}
                  selectedItems={reminderData.evaluatedsGroups}
                  placeholder={intl.messages['reminder.edit.field.evaluatedsGroups.placeholder']}
                  items={formatDataSet(groupsList)}
                  isMulti
                />
              </Field>
            </div>
            <div className="row-fields">
              <div className="row-fields">
                <Field
                  title={intl.messages['reminder.edit.field.startDate']}
                >
                  <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={intl.locale}>
                    <DateTimePicker
                      onChange={date => setReminderData({ ...reminderData, startDate: date })}
                      value={reminderData.startDate}
                      minDate={REMINDER_MINIMAL_DATE}
                      minDateMessage={intl.messages['datepicker.minDateMessage']}
                      placeholder={intl.messages['reminder.edit.field.startDate.placeholder']}
                      format={intl.locale === 'en' ? 'MM/DD/YYYY, HH:mm' : 'DD/MM/YYYY, HH:mm'}
                      ampm={false}
                      InputProps={{
                        disableUnderline: true,
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Field>
                <Field
                  title={intl.messages['reminder.edit.field.endDate']}
                >
                  <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={intl.locale}>
                    <DateTimePicker
                      onChange={date => setReminderData({ ...reminderData, endDate: date })}
                      value={reminderData.endDate}
                      minDate={REMINDER_MINIMAL_DATE}
                      minDateMessage={intl.messages['datepicker.minDateMessage']}
                      placeholder={intl.messages['reminder.edit.field.endDate.placeholder']}
                      format={intl.locale === 'en' ? 'MM/DD/YYYY, HH:mm' : 'DD/MM/YYYY, HH:mm'}
                      ampm={false}
                      InputProps={{
                        disableUnderline: true,
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Field>
              </div>
              <Field
                title={intl.messages['reminder.edit.field.recurrence']}
              >
                <SelectInput
                  setSelectedItems={selectedItem => setReminderData({ ...reminderData, recurrence: selectedItem })}
                  selectedItems={reminderData.recurrence}
                  placeholder={intl.messages['reminder.edit.field.recurrence.placeholder']}
                  items={translateLabels(intl, RECURRENCE_OPTIONS.RECURRENCE)}
                  isDisabled={isDisabled}
                  isAutoComplete
                />
              </Field>
            </div>
            { reminderData.recurrence
                && (
                  <div className="row-fields">
                    <div className="row-fields">
                      <Field
                        title={intl.messages['reminder.edit.field.deadline']}
                        tooltip={intl.messages['reminder.edit.field.deadline.tooltip']}
                      >
                        <MuiPickersUtilsProvider utils={MomentUtils} locale={intl.locale}>
                          <DatePicker
                            onChange={date => setReminderData({ ...reminderData, deadline: date })}
                            value={reminderData.deadline}
                            placeholder={intl.messages['reminder.edit.field.deadline.placeholder']}
                            format={intl.locale === 'en' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'}
                            disabled={isDisabled}
                            InputProps={{
                              disableUnderline: true,
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Field>
                    </div>
                    {reminderData.recurrence.key === 2
                    && (
                      <Field
                        title={intl.messages['reminder.edit.field.weekdays']}
                      >
                        <SelectInput
                          setSelectedItems={selectedItem => setReminderData({ ...reminderData, weekDays: selectedItem })}
                          selectedItems={reminderData.weekDays}
                          placeholder={intl.messages['reminder.edit.field.weekdays.placeholder']}
                          items={translateLabels(intl, RECURRENCE_OPTIONS.WEEK_DAYS)}
                          isDisabled={isDisabled}
                          isAutoComplete
                          isMulti
                        />
                      </Field>
                    )}
                  </div>
                )}
            {!isARoutine && (
            <div className="row-fields">
              <FormControlLabel
                control={(
                  <Switch
                    checked={reminderData.automaticScheduling}
                    value={reminderData.automaticScheduling}
                    onChange={e => setReminderData({ ...reminderData, automaticScheduling: e.target.checked })}
                    color="primary"
                    disabled={isDisabled}
                  />
                    )}
                label={intl.messages['reminder.edit.field.automatic.schedule']}
              />
            </div>
            )}
          </>
        </StepperCard>
      </Box>
    </>
  );
};

export default injectIntl(ReminderCreateStep);
