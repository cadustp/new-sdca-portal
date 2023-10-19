import TagManager from 'react-gtm-module';

const initializeGtm = () => {
  if (process.env.REACT_APP_ENVIRONMENT === 'DEV') return;
  const tagManagerArgs = {
    gtmId: 'GTM-TZ3823Q',
  };

  TagManager.initialize(tagManagerArgs);
};

export default initializeGtm;
