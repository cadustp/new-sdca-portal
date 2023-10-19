import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import Loading, { circularProgressSize } from '../../components/Loading';

const mapStateToProps = state => ({
  showLoading: state.login.loginLoading,
});

let loadingUserDataTitle = '';
let loadingUserDataMessage = '';

class LoadingUserData extends Component {
  translate(intl) {
    loadingUserDataTitle = intl.formatMessage({
      id: 'loading_user_data.title',
      defaultMessage: 'Aguarde um momento',
    });
    loadingUserDataMessage = intl.formatMessage({
      id: 'loading_user_data.message',
      defaultMessage: 'Estamos carregando os dados.',
    });

    defineMessages({
      loadingUserDataTitle: {
        id: 'loading_user_data.title',
        defaultMessage: 'Aguarde um momento',
      },
      loadingUserDataMessage: {
        id: 'loading_user_data.message',
        defaultMessage: 'Estamos carregando os dados.',
      },
    });
  }

  render = () => {
    const { showLoading, intl } = this.props;
    this.translate(intl);
    return (
      <>
        {showLoading ? (
          <Loading
            title={loadingUserDataTitle}
            message={loadingUserDataMessage}
            size={circularProgressSize.large}
          />
        ) : null}
      </>
    );
  };
}

LoadingUserData.propTypes = {
  showLoading: PropTypes.bool,
};

LoadingUserData.defaultProps = {
  showLoading: false,
};

export default injectIntl(connect(mapStateToProps)(LoadingUserData));
