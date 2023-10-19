import React from 'react';
import { injectIntl } from 'react-intl';
import { Input, Tooltip } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';

import { ReactComponent as ClipboardSvg } from '../../../../assets/icons/clipboard.svg';
import FileInput from '../../../../components/FileInput/index';

import './styles.css';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  form: any,
};

type DispatchProps = {
  setFormSettings: Function,
};

const SimpleTab: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  form,
  setFormSettings,
}) => {
  const addAttachment = file => {
    setFormSettings({ ...form, attachments: form.attachments.concat(file) });
  };

  const deleteAttachments = fileURL => {
    setFormSettings({ ...form, attachments: form.attachments.filter(file => !fileURL.includes(file.url)) });
  };

  const isValidLink = () => {
    if (form.externalLink?.trim().length) {
      const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+;=.%]+$/;
      return urlRegex.test(String(form.externalLink).toLowerCase());
    }
    return true;
  };

  const ErrorComponent = () => (
    <small style={{ color: 'red', padding: 5 }}>
      {!isValidLink()
        ? intl.messages['forms.new.externalLinkErrorMessage']
        : ''}
    </small>
  );

  const CustomTooltip = ({ content }) => (
    <Tooltip title={content} placement="right-start" arrow>
      <InfoOutlined style={{ marginLeft: '5px' }} fontSize="small" />
    </Tooltip>
  );

  return (
    <>
      <div className="cf-tab-container">
        <div className="cf-simple-fields">
          <div style={{ display: 'flex' }}>
            <div style={{ width: '100%' }}>
              <div className="cf-field">
                <p>{intl.messages['forms.new.name']}</p>
                <div className="cf-field-input">
                  <Input
                    className="content-input"
                    onChange={event => {
                      setFormSettings({ ...form, name: event.target.value });
                    }}
                    value={form.name}
                    disableUnderline
                    placeholder={intl.messages['forms.new.placeholders.name']}
                  />
                </div>
              </div>
              <div className="cf-field">
                <p>{intl.messages['forms.new.version']}</p>
                <div className="cf-field-input">
                  <Input
                    className="content-input"
                    onChange={event => {
                      setFormSettings({ ...form, version: event.target.value });
                    }}
                    value={form.version}
                    disableUnderline
                    placeholder={intl.messages['forms.new.placeholders.version']}
                  />
                </div>
              </div>
              <div className="cf-field">
                <p>{intl.messages['forms.new.description']}</p>
                <div className="cf-field-input">
                  <Input
                    className="content-input"
                    onChange={event => setFormSettings({
                      ...form,
                      description: event.target.value,
                    })}
                    value={form.description}
                    disableUnderline
                    placeholder={
                      intl.messages['forms.new.placeholders.description']
                    }
                    multiline
                    rows={4}
                  />
                </div>
              </div>
            </div>
            <div className="cf-simple-img">
              <ClipboardSvg />
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="cf-field-attachments">
              <p>
                {intl.messages['forms.new.attachments']}
                <CustomTooltip
                  content={intl.messages['forms.new.attachments.tooltip']}
                />
              </p>
              <div>
                <FileInput
                  key="attachment"
                  text={intl.messages['forms.new.placeholders.attachments']}
                  limit={2}
                  attachments={form.attachments}
                  setAttachments={addAttachment}
                  deleteAttachment={deleteAttachments}
                />
              </div>
            </div>
            <div className="cf-field" style={{ width: '100%' }}>
              <p>
                {intl.messages['forms.new.externalLink']}
                <CustomTooltip
                  content={intl.messages['forms.new.externalLink.tooltip']}
                />
              </p>
              <div className="cf-field-input">
                <Input
                  className="content-input"
                  onChange={event => setFormSettings({
                    ...form,
                    externalLink: event.target.value,
                  })}
                  value={form.externalLink}
                  disableUnderline
                  placeholder={
                    intl.messages['forms.new.externalLinkPlaceholder']
                  }
                />
              </div>
              <ErrorComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default injectIntl(SimpleTab);
