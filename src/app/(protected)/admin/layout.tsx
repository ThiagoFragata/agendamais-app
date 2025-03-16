import { getUserFromToken } from '@/shared/lib/auth'
import { redirect } from 'next/navigation'

export default async function ProtectedAdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUserFromToken()

    if (!user || user.role !== 'ADMIN') {
        return redirect('/unauthorized') // Redireciona se não for ADMIN
    }

    return <>{children}</>
}
