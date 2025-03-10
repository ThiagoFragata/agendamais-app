export const formatPhone = (value: string) => {
    // Remove tudo que não for número
    let cleaned = value.replace(/\D/g, '')

    // Aplica a máscara (XX) XXXXX-XXXX
    if (cleaned.length > 10) {
        cleaned = cleaned.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3')
    } else if (cleaned.length > 6) {
        cleaned = cleaned.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3')
    } else if (cleaned.length > 2) {
        cleaned = cleaned.replace(/^(\d{2})(\d{0,5})/, '($1) $2')
    } else {
        cleaned = cleaned.replace(/^(\d*)/, '($1')
    }

    return cleaned
}
