import React, { memo } from 'react';
import { format as formatDate } from 'date-fns';

interface Props {
  updating: boolean;
  lastUpdateDate?: number; // Unix ms
  error?: React.ReactNode;
  className?: string;
}

export default memo(function UpdateStatus({ updating, lastUpdateDate, error, className }: Props) {
  return (
    <div className={className}>
      {error
        ? <span>Failed to update rates: {error}</span>
        : updating && <span>Updating rates...</span>
      }
      {lastUpdateDate && (
        <span>Rates were updated at {formatDate(new Date(lastUpdateDate), 'H:mm:ss, D MMM YYYY')}</span>
      )}
    </div>
  );
});
