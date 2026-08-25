import { User } from "@/types/auth";
import UserCard from "./UserCard";

export default function UserList({ users }: { users: User[] }) {
  return (
    <section
      className="
        grid
        grid-cols-1
        gap-4

        sm:grid-cols-2

        lg:grid-cols-3

        xl:grid-cols-4
      "
    >
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </section>
  );
}