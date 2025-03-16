'use client'
import { useEffect } from 'react'

export function AlertAuthenticated({
    children,
}: {
    children: React.ReactNode
}) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search)
            if (urlParams.get('alert') === 'already-authenticated') {
                alert(
                    'Você já está autenticado e foi redirecionado para sua página inicial!'
                )
            }
        }
    }, [])

    return <>{children}</>
}
