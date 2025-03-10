'use client'
import { motion } from 'framer-motion'
import { ButtonHTMLAttributes } from 'react'
import { LoadingSpin } from '../loading_spin'
import styles from './button_default.module.css'

interface ButtonDefaultProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isPending?: boolean
    text: string
}

import { HTMLMotionProps } from 'framer-motion'

export function ButtonDefault({
    isPending,
    text,
    ...rest
}: ButtonDefaultProps & HTMLMotionProps<'button'>) {
    return (
        <motion.button
            className={styles.btn_signin}
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            {...rest}
        >
            {isPending ? <LoadingSpin /> : text}
        </motion.button>
    )
}
