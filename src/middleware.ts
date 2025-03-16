import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

const SECRET = process.env.JWT_SECRET as string

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token')?.value
    const path = req.nextUrl.pathname

    const protectedRoutes = ['/admin', '/owner', '/employee', '/customer']
    const publicRoutes = ['/', '/signin']

    try {
        if (!token) {
            // Permite acesso às rotas públicas sem token
            if (publicRoutes.includes(path)) {
                return NextResponse.next()
            }
            // Redireciona para login apenas se tentar acessar uma rota protegida
            return NextResponse.redirect(new URL('/signin', req.url))
        }

        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(SECRET)
        )
        const role = payload.role as string

        // Se estiver autenticado e tentar acessar rotas públicas, redireciona para a página correta com alerta
        if (publicRoutes.includes(path)) {
            let redirectUrl = '/'

            if (role === 'ADMIN') redirectUrl = '/admin'
            else if (role === 'OWNER') redirectUrl = '/owner'
            else if (role === 'EMPLOYEE') redirectUrl = '/employee'
            else if (role === 'CUSTOMER') redirectUrl = '/customer'

            const finalUrl = new URL(redirectUrl, req.url)
            finalUrl.searchParams.set('alert', 'already-authenticated')

            return NextResponse.redirect(finalUrl)
        }

        // Proteção de rotas baseada na role
        if (protectedRoutes.includes(path)) {
            if (path === '/admin' && role !== 'ADMIN') {
                return NextResponse.redirect(new URL('/unauthorized', req.url))
            }
            if (path === '/owner' && !['ADMIN', 'OWNER'].includes(role)) {
                return NextResponse.redirect(new URL('/unauthorized', req.url))
            }
            if (
                path === '/employee' &&
                !['ADMIN', 'OWNER', 'EMPLOYEE'].includes(role)
            ) {
                return NextResponse.redirect(new URL('/unauthorized', req.url))
            }
            if (
                path === '/customer' &&
                !['ADMIN', 'OWNER', 'EMPLOYEE', 'CUSTOMER'].includes(role)
            ) {
                return NextResponse.redirect(new URL('/unauthorized', req.url))
            }
        }
    } catch (error) {
        console.info('Error middle:', error)

        // Se o token for inválido, apaga o cookie e redireciona para login
        const response = NextResponse.redirect(new URL('/signin', req.url))
        response.cookies.delete('access_token')

        return response
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/admin',
        '/owner',
        '/employee',
        '/customer',
        '/signin',
        '/signup',
    ],
}
