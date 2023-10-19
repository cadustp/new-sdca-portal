import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

import messagesEn from '../../locales/en.json';
import messagesEs from '../../locales/es.json';
import messagesPtBr from '../../locales/pt-BR.json';

const messages = {
  en: messagesEn,
  es: messagesEs,
  'pt-BR': messagesPtBr,
};

const mapStateToProps = state => {
  const { language } = state.locale;
  return { locale: language, messages: messages[language] };
};

export default connect(mapStateToProps)(IntlProvider);
