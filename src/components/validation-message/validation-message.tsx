import { memo } from 'react';
import cn from 'classnames';

import { getMessageHighlighted } from '../../utils/get-message-highlighted';

import styles from './validation-message.module.css';

export const ValidationMessage = memo((props: { error: string; text: string; focusValue: boolean }) => (
  <p className={cn(styles.message, props.error && !props.focusValue && styles.accent)}>
    {props.error ? getMessageHighlighted(props.error, props.text) : props.text}
  </p>
));
