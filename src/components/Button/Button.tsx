import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Button.module.css'

type ButtonProps = {
  variant: 'primary' | 'secondary'
  size?: 'small' | 'medium'
  children: ReactNode
} & ComponentPropsWithoutRef<'button'>

export function Button({
  variant = 'secondary',
  size = 'medium',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={clsx(styles.button, styles[variant], styles[size])}
      {...props}
    >
      {children}
    </button>
  )
}
