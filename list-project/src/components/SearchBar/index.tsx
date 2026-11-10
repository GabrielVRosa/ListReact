interface SearchBarProps {
    search: string;
    setSearch: (search: string) => void
}

function SearchBar({ search, setSearch }: SearchBarProps) {
    return (
        <input
            type="text"
            placeholder="Pesquisar Usuário..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600"
        />
    )
}

export default SearchBar