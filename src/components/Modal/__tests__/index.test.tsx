import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Modal from '..'
import { mockUsers } from '../../../test/mockUsers'

describe('Modal', () => {
  it('abre o dialog e mostra os dados do usuário', () => {
    render(<Modal selectedUser={mockUsers[0]} setSelectedUser={vi.fn()} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('open')
    expect(screen.getByRole('heading', { name: 'Leanne Graham' })).toBeInTheDocument()
    expect(screen.getByText('sincere@april.biz')).toBeInTheDocument()
    expect(screen.getByText('1-770-736-8031')).toBeInTheDocument()
    expect(screen.getByText('Romaguera-Crona')).toBeInTheDocument()
    expect(screen.getByText('Gwenborough')).toBeInTheDocument()
  })

  it('não quebra quando o usuário não tem endereço', () => {
    render(<Modal selectedUser={mockUsers[2]} setSelectedUser={vi.fn()} />)

    expect(screen.getByRole('heading', { name: 'Clementine Bauch' })).toBeInTheDocument()
    expect(screen.getByText('Cidade:')).toBeInTheDocument()
  })

  it('fecha ao clicar no botão X', async () => {
    const user = userEvent.setup()
    const setSelectedUser = vi.fn()
    render(<Modal selectedUser={mockUsers[0]} setSelectedUser={setSelectedUser} />)

    await user.click(screen.getByRole('button'))

    expect(setSelectedUser).toHaveBeenCalledWith(null)
  })

  it('fecha ao clicar no backdrop (o próprio dialog)', async () => {
    const user = userEvent.setup()
    const setSelectedUser = vi.fn()
    render(<Modal selectedUser={mockUsers[0]} setSelectedUser={setSelectedUser} />)

    await user.click(screen.getByRole('dialog'))

    expect(setSelectedUser).toHaveBeenCalledWith(null)
  })

  it('NÃO fecha ao clicar no conteúdo interno', async () => {
    const user = userEvent.setup()
    const setSelectedUser = vi.fn()
    render(<Modal selectedUser={mockUsers[0]} setSelectedUser={setSelectedUser} />)

    await user.click(screen.getByRole('heading', { name: 'Leanne Graham' }))

    expect(setSelectedUser).not.toHaveBeenCalled()
  })
})