import type {User} from "../../types/api.types";

interface UserListProps {
  users: User[];
  setSelectedUser: (user: User | null) => void;
}

function UserList({ users, setSelectedUser }: UserListProps) {
  return (
      <ul className="space-y-4">
          {users.map((user) => (
              <li
                  key={user.id}
                  className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg shadow-md hover:border-zinc-700 transition cursor-pointer"
                  onClick={() => {
                      setSelectedUser(user);
                  }}
              >
                  <p className="font-semibold text-lg">{user.name}</p>
                  <p className="text-sm text-zinc-400">{user.email}</p>
              </li>
          ))}
      </ul>
  );
}

export default UserList;