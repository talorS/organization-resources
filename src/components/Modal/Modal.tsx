import CloseIcon from '@mui/icons-material/Close'
import { type ReactNode, useEffect, useRef } from 'react'
import { Button } from '../Button/Button'
import styles from './Modal.module.css'

export type ModalProps = {
  title: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ title, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (dialog && !dialog.open) {
      dialog.showModal?.()
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Button
          variant="secondary"
          size="small"
          aria-label="Close modal"
          title="Close"
          onClick={onClose}
        >
          <CloseIcon />
        </Button>
      </header>
      <div className={styles.content}>{children}</div>
    </dialog>
  )
}
