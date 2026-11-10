import type { User } from '../types/api.types'

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'sincere@april.biz',
    phone: '1-770-736-8031',
    website: 'hildegard.org',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: { lat: '-37.3159', lng: '81.1496' },
    },
    company: { name: 'Romaguera-Crona', catchPhrase: 'x', bs: 'y' },
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'shanna@melissa.tv',
    phone: '010-692-6593',
    website: 'anastasia.net',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: { lat: '-43.9509', lng: '-34.4618' },
    },
    company: { name: 'Deckow-Crist', catchPhrase: 'x', bs: 'y' },
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'nathan@yesenia.net',
    phone: '1-463-123-4447',
    website: 'ramiro.info',
    company: { name: 'Romaguera-Jacobson', catchPhrase: 'x', bs: 'y' },
  },
]