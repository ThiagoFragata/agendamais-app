import { getUserFromToken } from '@/shared/lib/auth'
import { redirect } from 'next/navigation'

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUserFromToken()

    if (!user) {
        return redirect('/signin')
    }

    return <>{children}</>
}
