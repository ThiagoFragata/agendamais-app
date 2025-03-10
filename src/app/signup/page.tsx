'use client'
import { api } from '@/services/axios_api'
import { ButtonBack } from '@/shared/components/button_back'
import { ButtonDefault } from '@/shared/components/button_default'
import useToast from '@/shared/hooks/useToast'
import { cleaned } from '@/shared/masks/cleaned'
import { formatPhone } from '@/shared/masks/phone'
import styles from '@/shared/styles/signIn.module.css'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup
    .object({
        email: yup.string().required('E-mail é obrigatório'),
        name: yup.string().required('Nome é obrigatório'),
        phone: yup.string().required('Telefone é obrigatório'),
        password: yup
            .string()
            .required('Senha é obrigatório')
            .min(8, 'A senha deve ter pelo menos 8 caracteres')
            .matches(
                /[A-Z]/,
                'A senha deve conter pelo menos uma letra maiúscula'
            )
            .matches(
                /[a-z]/,
                'A senha deve conter pelo menos uma letra minúscula'
            )
            .matches(/\d/, 'A senha deve conter pelo menos um número')
            .matches(
                /[!@#$%^&*(),.?":{}|<>]/,
                'A senha deve conter pelo menos um caractere especial'
            ),
    })
    .required()

type SchemaType = yup.InferType<typeof schema>

export default function SignUp() {
    const [phone, setPhone] = useState('')

    const { showToast } = useToast()
    const { replace } = useRouter()

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: SchemaType) =>
            await api.post('/auth/register/customer', data),
        onSuccess: () => {
            showToast('✅ Usuário cadastrado com sucesso!', 'success')
            replace('/')
        },
        onError: (error: { response: { data: { message: string } } }) => {
            console.info(error.response.data.message)

            showToast(`❌ ${error.response.data.message}`, 'error')
        },
    })

    const {
        register,
        handleSubmit,
        setValue,
        setFocus,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data: SchemaType) => {
        const payload = {
            email: data.email,
            name: data.name,
            phone: cleaned(data.phone),
            password: data.password,
        }

        mutate(payload)
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value)
        setPhone(formatted)
        setValue('phone', formatted)
    }

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        focus: 'email' | 'name' | 'phone' | 'password'
    ) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            setFocus(focus)
        }
    }

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
                <form
                    className={styles.form_group}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className={styles.input_group}>
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            {...register('email')}
                            className={styles.input_item}
                            autoCapitalize="none"
                            type="email"
                            placeholder="Digite seu e-mail"
                            enterKeyHint="next"
                            onKeyDown={(e) => handleKeyDown(e, 'name')}
                            required
                        />
                        <p>{errors.email?.message}</p>
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="name">Nome completo</label>
                        <input
                            id="name"
                            {...register('name')}
                            className={styles.input_item}
                            type="text"
                            autoCapitalize="words"
                            autoComplete="additional-name"
                            placeholder="Digite seu nome e sobrenome"
                            enterKeyHint="next"
                            onKeyDown={(e) => handleKeyDown(e, 'phone')}
                            required
                        />
                        <p>{errors.name?.message}</p>
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="phone">Telefone</label>
                        <input
                            id="phone"
                            {...register('phone')}
                            className={styles.input_item}
                            type="tel"
                            placeholder="Digite seu telefone"
                            value={phone}
                            onChange={handlePhoneChange}
                            maxLength={15}
                            enterKeyHint="next"
                            onKeyDown={(e) => handleKeyDown(e, 'password')}
                            required
                        />
                        <p>{errors.phone?.message}</p>
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            {...register('password')}
                            className={styles.input_item}
                            type="password"
                            placeholder="Digite sua senha"
                            enterKeyHint="send"
                            required
                        />
                        <p>{errors.password?.message}</p>
                    </div>

                    <ButtonDefault
                        text={'Finalizar'}
                        isPending={isPending}
                        type="submit"
                    />
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
