import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import styles from './toast.module.css'

interface ToastProps {
    message: string
    type: 'success' | 'error' | 'normal'
    onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 3000)
        return () => clearTimeout(timer)
    }, [onClose])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div
            className={`${styles.toast} ${styles[type]} ${isVisible ? styles.show : ''}`}
        >
            {message}
            <button className={styles.close} onClick={onClose}>
                <X />
            </button>
        </div>
    )
}
