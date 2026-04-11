export type ProfilePageContext = {
    email: string
    login: string
    firstName: string
    secondName: string
    displayName: string
    phone: string
}

export const mockProfile:ProfilePageContext = {
    email: 'pochta@yandex.ru',
    login: 'ivanivanov',
    firstName: 'Иван',
    secondName: 'Иванов',
    displayName: 'Иван',
    phone: '+7 (909) 967 30 30'
}
