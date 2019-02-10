import React, { memo } from 'react';
import NumberFormat from 'react-number-format';
import { currencyAmountPrecision } from '../../../constants';
import styles from './ExchangeFormHalf.module.css';

interface Props {
  allCurrencies: string[];
  currency: string;
  oppositeCurrency: string;
  amount: number | null;
  balance: number;
  convertRatio: number | null;
  negativeAmount?: boolean;
  className?: string;
  onCurrencySelect(currency: string): any;
  onAmountChange(amount: number | null): any;
  onAmountFocus(): any;
}

function valueToNumber(value: string): number | null {
  value = value.replace(/[^\d.]+/g, '');
  return /[0-9]/.test(value) ? Number(value) : null;
}

function ExchangeFormHalf(props: Props) {
  return (
    <div className={`${styles.box} ${props.className || ''}`}>
      <div className={styles.control}>
        <label className={styles.currencySelectBox}>
          <select
            value={props.currency}
            onChange={event => props.onCurrencySelect(event.target.value)}
            className={styles.currencySelect}
          >
            {props.allCurrencies.map(currency => (
              <option value={currency} key={currency}>{currency}</option>
            ))}
          </select>
        </label>
        <NumberFormat
          // type="tel" is not used because the iOS phone keyboard doesn't have a dot or a comma
          decimalScale={currencyAmountPrecision}
          allowNegative={false}
          prefix={props.negativeAmount ? '−' : '+'}
          value={props.amount === null ? '' : props.amount}
          onChange={event => props.onAmountChange(valueToNumber(event.target.value))} // The `onValueChange` is not used because it fires an event when the value is changed by props too
          onFocus={props.onAmountFocus}
          className={styles.amountInput}
        />
      </div>
      <div className={styles.info}>
        <div>
          You have {props.balance} <span className={styles.unit}>{props.currency}</span>
        </div>
        {props.convertRatio !== null && (
          <div>
            1 <span className={styles.unit}>{props.currency}</span>
            {' ≈ '}
            {props.convertRatio} <span className={styles.unit}>{props.oppositeCurrency}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ExchangeFormHalf);
