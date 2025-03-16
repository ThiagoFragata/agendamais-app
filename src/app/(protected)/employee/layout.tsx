import { getUserFromToken } from '@/shared/lib/auth'
import { redirect } from 'next/navigation'

export default async function ProtectedEmployeeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUserFromToken()

    if (!user || !['ADMIN', 'OWNER', 'EMPLOYEE'].includes(user.role)) {
        return redirect('/unauthorized') // Funcionário, Dono ou Admin
    }

    return <>{children}</>
}
