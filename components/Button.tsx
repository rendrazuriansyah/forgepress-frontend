// 'use client';

import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.button}
    >
      {text}
    </button>
  );
};

export default Button;
