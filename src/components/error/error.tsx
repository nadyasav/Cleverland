import { memo } from 'react';

import styles from './error.module.css';

export const Error = memo((props: { children: React.ReactNode }) => <p className={styles.error}>{props.children}</p>);
