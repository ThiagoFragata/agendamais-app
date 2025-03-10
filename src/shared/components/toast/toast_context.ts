import { createContext } from 'react'

export type ToastType = 'success' | 'error' | 'normal'

export interface ToastContextProps {
    showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextProps>({
    showToast: () => {},
})

export default ToastContext
