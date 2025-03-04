import styles from '@/shared/styles/signIn.module.css'
import Link from 'next/link'

export default function SignIn() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h3>Comece agora!</h3>
                <p>
                    Crie uma conta ou faça login para agendar e gerenciar seus
                    agendamentos
                </p>
            </header>

            <main className={styles.content}>
                <form className={styles.form_group}>
                    <div className={styles.input_group}>
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            className={styles.input_item}
                            type="email"
                            placeholder="Digite seu e-mail"
                            required
                        />
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            className={styles.input_item}
                            type="password"
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>

                    <button className={styles.btn_signin} type="submit">
                        Entrar
                    </button>
                </form>
            </main>

            <footer className={styles.footer}>
                <p>
                    Ainda não tem um conta?{' '}
                    <Link href="#">Crie agora mesmo!</Link>
                </p>
            </footer>
        </div>
    )
}
