import { useContext } from 'react'
import ToastContext from '../components/toast/toast_context'

const useToast = () => {
    return useContext(ToastContext)
}

export default useToast
