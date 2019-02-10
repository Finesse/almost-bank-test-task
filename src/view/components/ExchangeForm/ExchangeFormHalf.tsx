import React, { memo } from 'react';
import NumberFormat from 'react-number-format';
import { currencyAmountPrecision } from '../../../constants';

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
  return value ? Number(value) : null;
}

function ExchangeFormHalf(props: Props) {
  return (
    <div className={props.className}>
      <div>
        Currency:
        <select value={props.currency} onChange={event => props.onCurrencySelect(event.target.value)}>
          {props.allCurrencies.map(currency => (
            <option value={currency} key={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div>
        Amount:
        <NumberFormat
          // type="tel" is not used because the iOS phone keyboard doesn't have a dot or a comma
          decimalScale={currencyAmountPrecision}
          allowNegative={false}
          prefix={props.negativeAmount ? '−' : '+'}
          value={props.amount === null ? '' : props.amount}
          onChange={event => props.onAmountChange(valueToNumber(event.target.value))} // The `onValueChange` is not used because it fires an event when the value is changed by props too
          onFocus={props.onAmountFocus}
        />
      </div>
      <div>You have {props.balance} {props.currency}</div>
      {props.convertRatio !== null && (
        <div>1 {props.currency} ≈ {props.convertRatio} {props.oppositeCurrency}</div>
      )}
    </div>
  );
}

export default memo(ExchangeFormHalf);
