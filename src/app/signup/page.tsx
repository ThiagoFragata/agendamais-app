import { ButtonBack } from '@/shared/components/button_back'
import styles from '@/shared/styles/signIn.module.css'
import Link from 'next/link'

export default function SignUp() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <ButtonBack />
                <h3>Informe seus dados!</h3>
                <p>
                    Eles são necessários para prosseguirmos com o seu cadastro
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
                        <label htmlFor="name">Nome completo</label>
                        <input
                            id="name"
                            className={styles.input_item}
                            type="text"
                            placeholder="Digite seu nome e sobrenome"
                            required
                        />
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="phone">Telefone</label>
                        <input
                            id="phone"
                            className={styles.input_item}
                            type="tel"
                            placeholder="Digite seu telefone"
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
                        Criar
                    </button>
                </form>
            </main>

            <footer className={styles.footer}>
                <p>
                    Ao continuar, você concorda com os{' '}
                    <Link href="#">Termos & Condições de Uso</Link> e{' '}
                    <Link href="#">Politica de Privacidade</Link>
                </p>
            </footer>
        </div>
    )
}
