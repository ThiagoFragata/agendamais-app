'use client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import styles from './button_back.module.css'

export function ButtonBack() {
    const { back } = useRouter()

    return (
        <button className={styles.btn_container} onClick={back}>
            <ArrowLeft color="var(--foreground)" />
        </button>
    )
}
