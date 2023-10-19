/* eslint-disable import/prefer-default-export */
export const getBrowserTimezone = () => `${new Date().getTimezoneOffset() / -60}:00`;
