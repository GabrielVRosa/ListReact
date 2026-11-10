import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import type {User} from "./types/api.types";
import UserList from "./components/UserList";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(
      null,
  );

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users",
        );

        if (!response.ok) {
          throw new Error("Erro ao carregar os dados da API");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
      <div className="bg-zinc-950 text-zinc-100 p-8 min-h-screen">
        <div className="max-w-xl mx-auto">

          <h1 className="text-3xl font-bold mb-6 text-center">
            Lista de Usuários da API
          </h1>

          {loading && <p className="text-center text-lg">Carregando...</p>}

          {error && <p className="text-center text-red-400">Erro: {error}</p>}

          {!error && !loading && filteredUsers.length >= 0 && (
              <>
                <SearchBar setSearch={setSearch} search={search} />
                <UserList users={filteredUsers} setSelectedUser={setSelectedUser} />
              </>
          )}
        </div>

        {selectedUser && (
            <Modal
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
            />
        )}
      </div>
  );
}