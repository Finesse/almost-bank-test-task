import React, { memo, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { currencies } from '../../../constants';
import { ExchangeRatesBase, BalanceDictionary } from '../../../types';
import { ReduxState } from '../../../redux/types';
import * as actions from '../../../redux/actions';
import convert from '../../../helpers/currencyConverter';
import { useEventCallback } from '../../../helpers/react';
import { ExchangeForm } from '../../components';

interface OwnProps {
  className?: string;
}

interface StateProps {
  exchangeRates?: ExchangeRatesBase;
  balance?: BalanceDictionary;
}

interface ActionProps {
  exchange: typeof actions.exchange;
}

type Props = OwnProps & StateProps & ActionProps;

type LoadedProps = OwnProps & Required<StateProps> & ActionProps;

interface AmountAndSideState {
  amount: number | null;
  side: 'sell' | 'buy';
}

function mapState(state: ReduxState): StateProps {
  return {
    exchangeRates: state.exchangeRates.data,
    balance: state.balance
  };
}

const containerActions: ActionProps = {
  exchange: actions.exchange
};

function ExchangeFormContainer(props: Props) {
  return props.exchangeRates && props.balance
    ? <ExchangeFormLoadedContainer {...props} exchangeRates={props.exchangeRates} balance={props.balance} />
    : <ExchangeForm className={props.className} loading />;
}

const ExchangeFormLoadedContainer = memo(function ExchangeFormLoadedContainer({
  exchangeRates,
  balance,
  className,
  exchange
}: LoadedProps) {
  // This state is not stored in the Redux state because it is too view-specific.
  // Also such approach allows to have multiple independent forms on a page.
  const [sellCurrency, setSellCurrency] = useState(currencies[0]);
  const [buyCurrency, setBuyCurrency] = useState(currencies[1]);
  const [{amount, side: amountSide}, setAmountAndSide] = useState<AmountAndSideState>({amount: null, side: 'sell'});

  const sellAmount = amount === null || amountSide === 'sell'
    ? amount
    : convert(exchangeRates, amount, buyCurrency, sellCurrency);

  const buyAmount = amount === null || amountSide === 'buy'
    ? amount
    : convert(exchangeRates, amount, sellCurrency, buyCurrency);

  const sellBalance = balance[sellCurrency] || 0;
  const buyBalance = balance[buyCurrency] || 0;

  const isEnoughBalance =
    (sellAmount === null || sellBalance - sellAmount >= 0) &&
    (buyAmount === null || buyBalance + buyAmount >= 0);

  const onSellAmountChange = useCallback(
    (amount: number | null) => setAmountAndSide({ amount, side: 'sell' }),
    [setAmountAndSide]
  );

  const onBuyAmountChange = useCallback(
    (amount: number | null) => setAmountAndSide({ amount, side: 'buy' }),
    [setAmountAndSide]
  );

  // Freeze the amount in the input when the user focuses it so that he can change the value without an interruption
  // I realize that using `useEventCallback` is not a recommended pattern but passing dispatch down would break the component-container isolation
  const onSellFocus = useEventCallback(
    () => {
      if (amountSide === 'buy') {
        setAmountAndSide({ amount: sellAmount, side: 'sell' });
      }
    },
    [setAmountAndSide, amountSide, sellAmount]
  );

  const onBuyFocus = useEventCallback(
    () => {
      if (amountSide === 'sell') {
        setAmountAndSide({ amount: buyAmount, side: 'buy' });
      }
    },
    [setAmountAndSide, amountSide, buyAmount]
  );

  const onSubmit = useEventCallback(
    () => {
      if (amount === null) {
        return;
      }
      exchange(
        sellCurrency,
        amountSide === 'sell' ? amount : undefined,
        buyCurrency,
        amountSide === 'buy' ? amount : undefined
      );
      setAmountAndSide({ amount: null, side: amountSide });
    },
    [exchange, setAmountAndSide, sellCurrency, buyCurrency, amount, amountSide]
  );

  return (
    <ExchangeForm
      className={className}
      loading={false}
      currencies={currencies}
      sellCurrency={sellCurrency}
      buyCurrency={buyCurrency}
      sellAmount={sellAmount}
      buyAmount={buyAmount}
      sellBalance={balance[sellCurrency] || 0}
      buyBalance={balance[buyCurrency] || 0}
      sellToBuyRatio={convert(exchangeRates, 1, sellCurrency, buyCurrency)}
      buyToSellRatio={convert(exchangeRates, 1, buyCurrency, sellCurrency)}
      canSubmit={isEnoughBalance && amount !== null}
      error={!isEnoughBalance && 'Not enough balance'}
      onSellCurrencySelect={setSellCurrency}
      onBuyCurrencySelect={setBuyCurrency}
      onSellAmountChange={onSellAmountChange}
      onBuyAmountChange={onBuyAmountChange}
      onSellAmountFocus={onSellFocus}
      onBuyAmountFocus={onBuyFocus}
      onSubmit={onSubmit}
    />
  );
});

export default connect(mapState, containerActions)(ExchangeFormContainer);
