import { Link } from "react-router-dom";

import "../styles/header.scss";

const Header = ({ users, selectedUser, filterPostsByUser }) => {
  return (
    <header>
      <Link to="/" data-testid="home">
        <i className="bi bi-house" />
      </Link>

      <div className="input-group rounded">
        <label htmlFor="users">Filter by user: </label>

        <select
          name="users"
          className="users"
          data-testid="select-user"
          value={selectedUser}
          onChange={(e) => filterPostsByUser(e.target.value)}
        >
          <option value="">All users</option>
          {users.users?.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;
