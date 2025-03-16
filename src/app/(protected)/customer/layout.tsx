import { getUserFromToken } from '@/shared/lib/auth'
import { redirect } from 'next/navigation'

export default async function ProtectedCustomerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUserFromToken()

    if (
        !user ||
        !['ADMIN', 'OWNER', 'EMPLOYEE', 'CUSTOMER'].includes(user.role)
    ) {
        return redirect('/unauthorized')
    }

    return <>{children}</>
}
