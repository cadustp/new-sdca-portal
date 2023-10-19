import { connect } from 'react-redux';
import CustomSnackbar from './CustomSnackbar';
import { closeNotification } from '../../../redux/app/duck';

const mapStateToProps = state => ({
  data: {
    open: state.app.notification.show,
    type: state.app.notification.variant,
    message: state.app.notification.message,
    duration: state.app.notification.duration,
  },
});

const mapDispatchToProps = dispatch => ({
  handleClose: () => dispatch(closeNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomSnackbar);
