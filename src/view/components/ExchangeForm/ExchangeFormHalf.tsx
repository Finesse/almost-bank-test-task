import React, { memo } from 'react';
import { currencyAmountPrecision } from '../../../constants';

interface Props {
  allCurrencies: string[];
  currency: string;
  oppositeCurrency: string;
  amount: number | null;
  balance: number;
  convertRatio: number | null;
  className?: string;
  onCurrencySelect(currency: string): any;
  onAmountChange(amount: number | null): any;
  onAmountFocus(): any;
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
        <input
          type="number"
          min="0"
          step={10 ** -currencyAmountPrecision}
          value={props.amount === null ? '' : props.amount}
          onChange={event => props.onAmountChange(event.target.value === '' ? null : Number(event.target.value))}
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
