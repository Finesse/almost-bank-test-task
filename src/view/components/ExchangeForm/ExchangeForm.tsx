import React, { memo } from 'react';
import ExchangeFormHalf from './ExchangeFormHalf';
import styles from './ExchangeForm.module.css';
import { ReactComponent as ArrowIcon } from './arrowRight.svg';

interface CommonProps {
  className?: string;
}

interface LoadingProps {
  stage: 'loading';
}

interface ErrorProps {
  stage: 'error';
  error: string;
}

interface ReadyProps {
  stage: 'ready'
  currencies: string[];
  sellCurrency: string;
  buyCurrency: string;
  sellAmount: number | null;
  buyAmount: number | null;
  sellBalance: number;
  buyBalance: number;
  sellToBuyRatio: number | null;
  buyToSellRatio: number | null;
  canSubmit: boolean;
  validationError?: React.ReactNode;
  onSellCurrencySelect(currency: string): any;
  onBuyCurrencySelect(currency: string): any;
  onSellAmountChange(amount: number | null): any;
  onBuyAmountChange(amount: number | null): any;
  onSellAmountFocus(): any;
  onBuyAmountFocus(): any;
  onSubmit(): any;
}

type Props = CommonProps & (ErrorProps | LoadingProps | ReadyProps);

function ExchangeForm(props: Props) {
  if (props.stage === 'loading') {
    return <div className={`${styles.message} ${props.className || ''}`}>Loading the data...</div>;
  }

  if (props.stage === 'error') {
    return <div className={`${styles.message} ${props.className || ''}`}>Error: {props.error}</div>;
  }

  return (
    <form
      className={`${styles.form} ${props.className || ''}`}
      onSubmit={event => {
        event.preventDefault();
        if (props.canSubmit) {
          props.onSubmit();
        }
      }}
    >
      <ExchangeFormHalf
        className={styles.side}
        allCurrencies={props.currencies}
        currency={props.sellCurrency}
        oppositeCurrency={props.buyCurrency}
        amount={props.sellAmount}
        balance={props.sellBalance}
        convertRatio={props.sellToBuyRatio}
        onCurrencySelect={props.onSellCurrencySelect}
        onAmountChange={props.onSellAmountChange}
        onAmountFocus={props.onSellAmountFocus}
        negativeAmount
      />
      <ArrowIcon className={styles.arrow} />
      <ExchangeFormHalf
        className={styles.side}
        allCurrencies={props.currencies}
        currency={props.buyCurrency}
        oppositeCurrency={props.sellCurrency}
        amount={props.buyAmount}
        balance={props.buyBalance}
        convertRatio={props.buyToSellRatio}
        onCurrencySelect={props.onBuyCurrencySelect}
        onAmountChange={props.onBuyAmountChange}
        onAmountFocus={props.onBuyAmountFocus}
      />
      <div className={styles.buttonSection}>
        <button disabled={!props.canSubmit} className={styles.button}>Exchange</button>
        {props.validationError && (
          <div className={styles.validationError}>{props.validationError}</div>
        )}
      </div>
    </form>
  );
}

export default memo(ExchangeForm);
