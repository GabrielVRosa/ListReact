import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import SearchBar from '..'

describe('SearchBar', () => {
  it('renderiza o input com placeholder e valor atual', () => {
    render(<SearchBar search="abc" setSearch={vi.fn()} />)

    expect(screen.getByPlaceholderText('Pesquisar Usuário...')).toHaveValue('abc')
  })

  it('chama setSearch a cada caractere digitado', async () => {
    const user = userEvent.setup()
    const setSearch = vi.fn()
    render(<SearchBar search="" setSearch={setSearch} />)

    await user.type(screen.getByRole('textbox'), 'Ann')

    expect(setSearch).toHaveBeenCalledTimes(3)
    expect(setSearch).toHaveBeenLastCalledWith('n')
  })
})