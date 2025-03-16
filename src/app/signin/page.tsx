'use client'
import { api } from '@/services/axios_api'
import { ButtonDefault } from '@/shared/components/button_default'
import useToast from '@/shared/hooks/useToast'
import styles from '@/shared/styles/signIn.module.css'
import { setCookie } from 'cookies-next/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export default function SignIn() {
    const { replace } = useRouter()
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [payload, setPayload] = useState({
        email: '',
        password: '',
    })

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            inputRef.current?.focus()
        }
    }

    const { showToast } = useToast()

    const handleSubmitSignIn = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()

        try {
            const { data } = await api.post<{ access_token: string }>(
                '/auth/login',
                payload
            )

            setCookie('access_token', data.access_token)
            replace('/customer')
            showToast('Login realizado com sucesso!', 'normal')
        } catch (err) {
            const error = err as { response: { data: { message: string } } }
            showToast(error.response.data.message, 'error')
            console.info(error.response.data)
        }
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h3>Comece agora!</h3>
                <p>
                    Crie uma conta ou faça login para agendar e ver suas
                    reservas.
                </p>
            </header>

            <main className={styles.content}>
                <form className={styles.form_group}>
                    <div className={styles.input_group}>
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            autoCapitalize="none"
                            className={styles.input_item}
                            type="email"
                            placeholder="Digite seu e-mail"
                            required
                            onKeyDown={handleKeyDown}
                            enterKeyHint="next"
                            value={payload.email}
                            onChange={(e) => {
                                setPayload({
                                    ...payload,
                                    email: e.target.value,
                                })
                            }}
                        />
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            ref={inputRef}
                            className={styles.input_item}
                            type="password"
                            placeholder="Digite sua senha"
                            required
                            value={payload.password}
                            onChange={(e) => {
                                setPayload({
                                    ...payload,
                                    password: e.target.value,
                                })
                            }}
                        />
                    </div>

                    <ButtonDefault
                        text={'Entrar'}
                        // isPending={isPending}
                        onClick={(e) => handleSubmitSignIn(e)}
                        type="submit"
                    />
                </form>
            </main>

            <footer className={styles.footer}>
                <p>
                    Ainda não tem um conta?{' '}
                    <Link href="/signup">Crie agora mesmo!</Link>
                </p>
            </footer>
        </div>
    )
}
