import { useCallback, useState } from 'react'
import { Toast } from './toast'
import ToastContext, { ToastType } from './toast_context'

interface ToastData {
    message: string
    type: ToastType
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toast, setToast] = useState<ToastData | null>(null)

    const showToast = useCallback(
        (message: string, type: ToastType = 'normal') => {
            setToast({ message, type })

            setTimeout(() => {
                setToast(null)
            }, 3000)
        },
        []
    )

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </ToastContext.Provider>
    )
}
