import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import UserList from '..'
import { mockUsers } from '../../../test/mockUsers'

describe('UserList', () => {
  it('renderiza nome e email de cada usuário', () => {
    render(<UserList users={mockUsers} setSelectedUser={vi.fn()} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(mockUsers.length)
    for (const user of mockUsers) {
      expect(screen.getByText(user.name)).toBeInTheDocument()
      expect(screen.getByText(user.email)).toBeInTheDocument()
    }
  })

  it('não renderiza itens quando a lista está vazia', () => {
    render(<UserList users={[]} setSelectedUser={vi.fn()} />)

    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('chama setSelectedUser com o usuário clicado', async () => {
    const user = userEvent.setup()
    const setSelectedUser = vi.fn()
    render(<UserList users={mockUsers} setSelectedUser={setSelectedUser} />)

    await user.click(screen.getByText('Ervin Howell'))

    expect(setSelectedUser).toHaveBeenCalledWith(mockUsers[1])
  })
})