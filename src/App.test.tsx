import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { mockUsers } from './test/mockUsers'

function mockFetchSuccess(data = mockUsers) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok: true, json: async () => data }),
  )
}

describe('App', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('mostra "Carregando..." enquanto a requisição não termina', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
    render(<App />)

    expect(screen.getByText('Carregando...')).toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('renderiza a lista de usuários após o fetch', async () => {
    mockFetchSuccess()
    render(<App />)

    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.queryByText('Carregando...')).not.toBeInTheDocument()
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users')
  })

  it('mostra mensagem de erro quando a resposta não é ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    render(<App />)

    expect(
      await screen.findByText(/Erro: Erro ao carregar os dados da API/),
    ).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.queryByText('Carregando...')).not.toBeInTheDocument()
  })

  it('mostra mensagem de erro quando o fetch falha (rede)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network down')))
    render(<App />)

    expect(await screen.findByText('Erro: Network down')).toBeInTheDocument()
  })

  it('filtra usuários pelo nome ignorando maiúsculas/minúsculas', async () => {
    const user = userEvent.setup()
    mockFetchSuccess()
    render(<App />)
    await screen.findByText('Leanne Graham')

    await user.type(screen.getByPlaceholderText('Pesquisar Usuário...'), 'ERVIN')

    expect(screen.getByText('Ervin Howell')).toBeInTheDocument()
    expect(screen.queryByText('Leanne Graham')).not.toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })

  it('mostra lista vazia quando nada corresponde à busca', async () => {
    const user = userEvent.setup()
    mockFetchSuccess()
    render(<App />)
    await screen.findByText('Leanne Graham')

    await user.type(screen.getByRole('textbox'), 'zzzz')

    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('abre o modal com os detalhes ao clicar em um usuário', async () => {
    const user = userEvent.setup()
    mockFetchSuccess()
    render(<App />)

    await user.click(await screen.findByText('Ervin Howell'))

    const dialog = await screen.findByRole('dialog')
    expect(within(dialog).getByRole('heading', { name: 'Ervin Howell' })).toBeInTheDocument()
    expect(within(dialog).getByText('Deckow-Crist')).toBeInTheDocument()
    expect(within(dialog).getByText('Wisokyburgh')).toBeInTheDocument()
  })

  it('fecha o modal ao clicar no botão de fechar', async () => {
    const user = userEvent.setup()
    mockFetchSuccess()
    render(<App />)

    await user.click(await screen.findByText('Ervin Howell'))
    const dialog = await screen.findByRole('dialog')
    await user.click(within(dialog).getByRole('button'))

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })
})