import React from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { captureNavigation } from '../../../analytics';
import Button from '../../../components/Button';
import './styles.css';

type Props = {
  intl: {
    messages: [];
  };
};

const Header: React.FC<Props> = ({
  intl,
}) => (
  <div className="header">
    <p className="page-title">{intl.messages['evaluateds.title']}</p>
    <div className="buttons">
      <Button
        component={Link}
        to="/admin/evaluateds/new"
        variant="contained"
        onClick={() => captureNavigation('/admin/evaluateds/new')}
      >
        {intl.messages['evaluateds.create']}
      </Button>
    </div>
  </div>
);

export default injectIntl(Header);
