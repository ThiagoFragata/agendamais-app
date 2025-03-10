'use client'
import { queryClient } from '@/services/query_client'
import { ToastProvider } from '@/shared/components/toast/toast_provider'
import { QueryClientProvider } from '@tanstack/react-query'

export function Providers({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ToastProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ToastProvider>
    )
}
