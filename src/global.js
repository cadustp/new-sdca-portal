// global.BASE_URL = `${process.env.REACT_APP_BASE_URI_API}/api_portal/v1`;
// global.BASE_URL = 'https://api-dev.dayway.falconi.com/api_portal/v1';
// global.BASE_URL = 'https://api-hom.dayway.falconi.com/api_portal/v1';
global.BASE_URL = 'http://localhost:5000/api_portal/v1';

global.ENVIRONMENT_STRING = `${
  global.BASE_URL.split('/')[2].split('.', 1)[0]
} : ${global.BASE_URL.split('/')
  .slice(-1)
  .pop()}`;
