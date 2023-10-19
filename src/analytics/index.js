/** @format */
import mixpanel from 'mixpanel-browser';

const isProduction = process.env.NODE_ENV === 'production';
mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN, { debug: !isProduction });

const setUserProfile = async userId => {
  mixpanel.identify(userId, {});
};

const captureEvent = async (eventName, props) => {
  mixpanel.track(eventName, props);
};
const captureNavigation = to => {
  captureEvent('navigate', {
    from: window.location.pathname,
    to,
  });
};

export { setUserProfile, captureEvent, captureNavigation };
