import React, { memo } from 'react';
import { format as formatDate } from 'date-fns';
import styles from './UpdateStatus.module.css';
import { ReactComponent as RefreshIcon } from './refresh.svg';

interface Props {
  updating: boolean;
  lastUpdateDate?: number; // Unix ms
  error?: React.ReactNode;
  className?: string;
}

export default memo(function UpdateStatus({ updating, lastUpdateDate, error, className = '' }: Props) {
  return (
    <div className={`${styles.container} ${className}`}>
      {error && (
        <div className={styles.error}>Failed to update rates: {error}</div>
      )}
      <div className={styles.data}>
        {updating && (
          <RefreshIcon className={styles.updating} />
        )}
        {lastUpdateDate && (
          <div>Rates were updated at {formatDate(new Date(lastUpdateDate), 'H:mm:ss, D MMM YYYY')}</div>
        )}
      </div>
    </div>
  );
});
