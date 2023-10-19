import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux';

import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import pt from 'react-intl/locale-data/pt';
import messagesEn from '../../locales/en.json';
import messagesEs from '../../locales/es.json';
import messagesPtBr from '../../locales/pt-BR.json';

addLocaleData([...en, ...es, ...pt]);

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
