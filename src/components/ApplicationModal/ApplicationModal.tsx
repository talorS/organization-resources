import { useState, type SubmitEvent } from 'react'
import { toast } from 'react-toastify'
import { Modal } from '../Modal/Modal'
import { Field } from '../Field/Field'
import { Button } from '../Button/Button'
import styles from './ApplicationModal.module.css'
import { useApplications } from '../../customHooks/useApplications'

type ApplicationModalProps = {
    selectedIds: string[];
    onClose: () => void
}

export function ApplicationModal({ onClose, selectedIds }: ApplicationModalProps) {
    const [name, setName] = useState('')
    const { createApplication } = useApplications();
    const normalizedName = name.trim()
    const canSubmit = normalizedName.length > 0

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!canSubmit) {
            return
        }
        createApplication({ name: normalizedName, resourceIds: selectedIds })

        toast.success('Application created successfully', { 
            position: "top-center",
            autoClose: 500,
        })
        onClose()
    }

    return (
        <Modal title="Create Application" onClose={onClose}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Field label="Name">
                    <input
                        id="application-name"
                        className={styles.input}
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Application name"
                        autoFocus
                    />
                </Field>
                <div className={styles.actions}>
                    <Button variant="primary" type="submit" disabled={!canSubmit}>
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
