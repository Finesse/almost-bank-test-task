import React, { memo } from 'react';
import styles from './Layout.module.css';

interface Props {
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export default memo(function Layout({ children, footer }: Props) {
  return (
    <div className={styles.body}>
      <main className={styles.main}>
        {children}
      </main>
      {footer && (
        <footer className={styles.footer}>
          {footer}
        </footer>
      )}
    </div>
  );
});
