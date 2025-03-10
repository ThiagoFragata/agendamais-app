'use client'
import { ButtonDefault } from '@/shared/components/button_default'
import styles from '@/shared/styles/signIn.module.css'
import Link from 'next/link'
import { useRef } from 'react'

export default function SignIn() {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault() // Evita o comportamento padrão de envio do formulário
            inputRef.current?.focus() // Move para o próximo campo
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
                        />
                    </div>

                    <ButtonDefault
                        text={'Entrar'}
                        // isPending={isPending}
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
