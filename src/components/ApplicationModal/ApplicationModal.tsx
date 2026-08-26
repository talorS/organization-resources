import { useState, type SubmitEvent } from 'react'
import { Modal } from '../Modal/Modal'
import { Field } from '../Field/Field'
import { Button } from '../Button/Button'
import styles from './ApplicationModal.module.css'

type ApplicationModalProps = {
    onCreate: ({ name, description }: { name: string; description?: string }) => void
    onClose: () => void
}

export function ApplicationModal({ onCreate, onClose }: ApplicationModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const normalizedName = name.trim();
    const canSubmit = normalizedName.length > 0;

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!canSubmit) {
            return
        }
        onCreate({ name: normalizedName, description: description.trim() });
    }

    return (
        <Modal title="Create Application" onClose={onClose}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Field label="Name" required>
                    <input
                        id="application-name"
                        className={styles.input}
                        type="text"
                        aria-label="Application name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Application name"
                        required
                    />
                </Field>
                <Field label="Description">
                    <textarea
                        id="application-description"
                        className={styles.textarea}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Application Description"
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
