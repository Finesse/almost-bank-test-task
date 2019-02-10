import { connect } from 'react-redux';
import { UpdateStatus } from '../../components';
import { ReduxState } from '../../../redux/types';

export default connect((state: ReduxState) => ({
  updating: state.exchangeRates.areUpdating,
  lastUpdateDate: state.exchangeRates.lastUpdateDate,
  error: state.exchangeRates.updateError
}))(UpdateStatus);
