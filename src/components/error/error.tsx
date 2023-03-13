import { memo } from 'react';
import cn from 'classnames';

import styles from './error.module.css';

export const Error = memo((props: { children: React.ReactNode; errorStaticPos: boolean }) => (
  <p className={cn(styles.error, props.errorStaticPos && styles.static)}>{props.children}</p>
));
