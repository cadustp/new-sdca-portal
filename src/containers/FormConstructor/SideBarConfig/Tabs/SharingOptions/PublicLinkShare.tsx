import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { injectIntl } from 'react-intl';
import {
  Tooltip,
  Switch,
  FormControlLabel,
  Input,
  InputAdornment,
  IconButton,
  Modal,
  Button,
} from '@mui/material';
import {
  InfoOutlined, Visibility, VisibilityOff, FileCopyOutlined,
} from '@mui/icons-material';
import '../styles.css';
import QRCode from 'react-qr-code';
import CustomSnackbar from '../../../../../components/shared/CustomSnackbar/CustomSnackbar';
import CustomErrorText from '../../../../../components/shared/CustomErrorText';
import { isValidURL, validateURL } from '../../../../../helpers/utils';

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

const PublicLinkShare: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  form,
  setFormSettings,
}) => {
  const [shareSettings, setShareSettings] = useState({
    openLogoPreview: false,
    enableCustomPassword: false,
    showPassword: false,
    enableQRCode: false,
    showCopySnackBar: false,
  });
  const [showRedirectURLError, setShowRedirectURLError] = useState(false);
  const [showImageURLError, setShowImageURLError] = useState(false);
  const domainExtension = '.portal.dayway.falconi.com';
  const publicLink = `${window.location.origin}/forms/public/${form.publicLink.uuid}`;

  useEffect(() => {
    setUuid();
  }, []);

  const setUuid = () => {
    if (form?.publicLink?.uuid || !form?.publicLink.active) return;

    setFormSettings({
      ...form,
      publicLink: {
        ...form.publicLink,
        uuid: uuid(),
      },
    });
  };

  const handleAuth = checked => {
    setFormSettings({
      ...form,
      publicLink: {
        ...form.publicLink,
        authRequired: checked,
        customPasswordRequired: checked ? false : form.publicLink.customPasswordRequired,
        customPassword: checked ? form.publicLink.customPassword : '',
      },
    });
    setShareSettings({ ...shareSettings, enableCustomPassword: checked ? shareSettings.enableCustomPassword : false });
  };

  const setLogo = (file: any) => {
    setFormSettings({ ...form, publicLink: { ...form.publicLink, customImg: file } });
  };

  const deleteLogo = () => {
    setFormSettings({
      ...form,
      publicLink: {
        ...form.publicLink,
        customImg: {
          url: null,
          file: null,
        },
      },
    });
  };

  const handleSaveQRCode = () => {
    const svg = document.getElementById('QRCode') as HTMLImageElement;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = form.name ? `${form.name} - QRCode` : 'QRCode';
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const formatURL = (originalURL, formSettingsField) => {
    let url = originalURL;

    if (isValidURL(originalURL)) {
      url = originalURL.replace('https://', '').replace('http://', '');
      url = `https://${url}`;
      setFormSettings({ ...form, publicLink: { ...form.publicLink, [formSettingsField]: url } });
    }
  };

  const Separator = () => (<div className="cf-tabs-separator" />);

  const CustomTooltip = ({ content }) => (
    <Tooltip
      title={content}
      placement="right-start"
      arrow
    >
      <InfoOutlined
        style={{ marginLeft: '5px' }}
        fontSize="small"
      />
    </Tooltip>
  );

  const LogoPreview = () => (
    <Modal
      open={shareSettings.openLogoPreview}
      onClose={() => setShareSettings({ ...shareSettings, openLogoPreview: false })}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="logo-modal"
    >
      <div className="logo-paper">
        <img
          src={form.publicLink.customImg?.url}
          style={{
            maxWidth: '222px',
            width: '100%',
          }}
        />
      </div>
    </Modal>
  );

  const CustomSwitch = ({
    value, onChange, label, disabled = false, tooltip = null,
  }) => (
    <div className="cf-field-switch">
      <FormControlLabel
        control={(
          <Switch
            checked={value}
            value={value}
            onChange={onChange}
            color="primary"
          />
        )}
        label={label}
        disabled={disabled}
      />
      {tooltip && <CustomTooltip content={tooltip} />}
    </div>
  );

  const PublicLinkInput = () => (
    <div className="cf-share-field">
      <p>
        {intl.messages['forms.new.publicLink']}
      </p>
      <div className="cf-custom-link">
        <div className="cf-field-input" style={{ width: '100%' }}>
          <Input
            className="content-input"
            value={publicLink}
            disableUnderline
            readOnly
          />
        </div>
        <IconButton
          onClick={() => navigator.clipboard.writeText(publicLink)}
        >
          <FileCopyOutlined fontSize="small" style={{ padding: '3px' }} />
        </IconButton>
      </div>
    </div>
  );

  const publicOptions = () => (
    <>
      <Separator />
      <PublicLinkInput />
      <div className="cf-share-field">
        <CustomSwitch
          value={form.publicLink.descriptionRequired}
          onChange={e => setFormSettings({ ...form, publicLink: { ...form.publicLink, descriptionRequired: e.target.checked } })}
          label={intl.messages['forms.new.public.showHeader']}
          tooltip={intl.messages['forms.new.public.showHeader.tooltip']}
        />
      </div>
      <div className="cf-share-field">
        <p>
          {intl.messages['forms.new.public.customMessage']}
          <CustomTooltip content={intl.messages['forms.new.public.customMessage.tooltip']} />
        </p>
        <div className="cf-field-input">
          <Input
            className="content-input"
            onChange={event => {
              setFormSettings({ ...form, publicLink: { ...form.publicLink, afterMessage: event.target.value } });
            }}
            value={form.publicLink.afterMessage}
            disableUnderline
            placeholder={intl.messages['forms.new.public.customMessage.placeholder']}
          />
        </div>
      </div>
      <div className="cf-share-field">
        <p>
          {intl.messages['forms.new.public.customImage']}
          <CustomTooltip content={intl.messages['forms.new.public.customImage.tooltip']} />
        </p>
        {showImageURLError && <CustomErrorText text="forms.new.public.customImage.errorURL" />}

        <div className={`cf-field-input ${showImageURLError && 'invalid'}`}>
          <Input
            className="content-input"
            onChange={event => {
              setFormSettings({ ...form, publicLink: { ...form.publicLink, afterImageLink: event.target.value } });
            }}
            onBlur={event => { validateURL(event.target.value, setShowImageURLError); formatURL(event.target.value, 'afterImageLink'); }}
            value={form.publicLink.afterImageLink}
            disableUnderline
            placeholder={intl.messages['forms.new.public.customImage.placeholder']}
          />
        </div>
        {(form.publicLink.afterImageLink
          && <img style={{ width: '100px', height: '100px' }} src={form.publicLink.afterImageLink} />
        )}
      </div>

      {form.publicLink.afterImageLink
      && (
      <div className="cf-share-field">
        <p>
          {intl.messages['forms.new.public.customImage.redirect']}
          <CustomTooltip content={intl.messages['forms.new.public.customImage.redirect.tooltip']} />
        </p>
        {showRedirectURLError && <CustomErrorText text="forms.new.public.customImage.errorURL" />}

        <div className={`cf-field-input ${showRedirectURLError && 'invalid'}`}>
          <Input
            className="content-input"
            onChange={event => {
              setFormSettings({ ...form, publicLink: { ...form.publicLink, afterImageRedirect: event.target.value } });
            }}
            onBlur={event => { validateURL(event.target.value, setShowRedirectURLError); formatURL(event.target.value, 'afterImageRedirect'); }}
            value={form.publicLink.afterImageRedirect}
            disableUnderline
            placeholder={intl.messages['forms.new.public.customImage.redirect.placeholder']}
          />
        </div>
      </div>

      )}
    </>
  );

  // TODO: a ser implementado posteriormente
  const customLink = () => (
    <>
      <div className="cf-share-field">
        <p>
          {intl.messages['forms.new.customLink']}
          <CustomTooltip content={intl.messages['forms.new.customLink.tooltip']} />
        </p>
        <div className="cf-custom-link">
          <div className="cf-field-input" style={{ width: '100%' }}>
            <Input
              className="content-input"
              onChange={event => {
                setFormSettings({ ...form, publicLink: { ...form.publicLink, customDomain: event.target.value } });
              }}
              value={form.publicLink.customDomain}
              disableUnderline
              placeholder={intl.messages['forms.new.customLink.placeholder']}
              endAdornment={<InputAdornment position="end">{domainExtension}</InputAdornment>}
              autoComplete="new-email"
            />
          </div>
          <IconButton
            onClick={() => { navigator.clipboard.writeText(`${form.publicLink.customDomain}${domainExtension}`); setShareSettings({ ...shareSettings, showCopySnackBar: true }); }}
          >
            <FileCopyOutlined fontSize="small" style={{ padding: '3px' }} />
          </IconButton>
        </div>
      </div>
      <Separator />
    </>
  );

  const customAuth = () => (
    <>
      <div style={{ paddingBlock: '15px' }}>
        <div className="cf-advanced-row">
          <div className="cf-field">
            <CustomSwitch
              value={form.publicLink.authRequired}
              onChange={e => handleAuth(e.target.checked)}
              label={intl.messages['forms.new.public.authRequired']}
              tooltip={intl.messages['forms.new.public.authRequired.tooltip']}
            />
          </div>
          <div className="cf-field">
            <CustomSwitch
              value={form.publicLink.customPasswordRequired}
              onChange={e => {
                setFormSettings({
                  ...form,
                  publicLink: {
                    ...form.publicLink,
                    customPasswordRequired: e.target.checked,
                    authRequired: e.target.checked ? !e.target.checked : form.publicLink.authRequired,
                    customPassword: !e.target.checked ? '' : form.publicLink.customPassword,
                  },
                });
              }}
              label={intl.messages['forms.new.public.customPassword']}
            />
          </div>
        </div>
        {form.publicLink.customPasswordRequired
          && (
            <div className="cf-advanced-row">
              <div className="cf-field" />
              <div className="cf-field">
                <div className="cf-field-input">
                  <Input
                    className="content-input"
                    onChange={event => {
                      setFormSettings({ ...form, publicLink: { ...form.publicLink, customPassword: event.target.value } });
                    }}
                    type={shareSettings.showPassword ? 'text' : 'password'}
                    value={form.publicLink.customPassword}
                    disableUnderline
                    placeholder={intl.messages['forms.new.public.customPassword.placeholder']}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShareSettings({ ...shareSettings, showPassword: !shareSettings.showPassword })}
                          onMouseDown={e => e.preventDefault()}
                        >
                          {shareSettings.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )}
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>
          )}
      </div>
      <Separator />
    </>
  );

  const publicQRCode = () => (
    <>
      <div className="cf-share-field">
        <CustomSwitch
          value={shareSettings.enableQRCode}
          onChange={e => {
            setShareSettings({ ...shareSettings, enableQRCode: e.target.checked });
          }}
          label={intl.messages['forms.new.public.enableQRCode']}
        />
      </div>
      {shareSettings.enableQRCode && (
        <>
          <div className="cf-qrcode">
            <QRCode
              id="QRCode"
              size={160}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={publicLink}
            />
            <Button
              variant="outlined"
              onClick={() => handleSaveQRCode()}
            >
              {intl.messages['forms.new.public.saveQRCode']}
            </Button>
          </div>
        </>
      )}
    </>
  );

  const CopySnackBar = () => (
    <CustomSnackbar
      data={{
        message: intl.messages['utils.copied'],
        type: 'success',
        open: shareSettings.showCopySnackBar,
      }}
      handleClose={() => { setShareSettings({ ...shareSettings, showCopySnackBar: false }); }}
    />
  );

  return (
    <>
      {publicOptions()}
      {customAuth()}
      {publicQRCode()}
      <LogoPreview />
      <CopySnackBar />
    </>
  );
};

export default injectIntl(PublicLinkShare);
