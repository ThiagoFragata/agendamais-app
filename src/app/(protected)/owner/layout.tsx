import { getUserFromToken } from '@/shared/lib/auth'
import { redirect } from 'next/navigation'

export default async function ProtectedOwnerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUserFromToken()

    if (!user || !['ADMIN', 'OWNER'].includes(user.role)) {
        return redirect('/unauthorized') // Dono ou Admin podem acessar
    }

    return <>{children}</>
}
