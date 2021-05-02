import md5 from 'md5'

export const generateGravatar = (email) => {
    const hashedEmail = md5(email.toLowerCase().trim())
    return `https://www.gravatar.com/avatar/${hashedEmail}?d=identicon`
}