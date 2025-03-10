'use client'
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'

export function LoadingSpin() {
    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
            <Loader size={14} />
        </motion.div>
    )
}
