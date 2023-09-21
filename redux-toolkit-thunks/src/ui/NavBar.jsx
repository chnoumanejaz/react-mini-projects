import styled from 'styled-components';
import { Input } from './Input';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { searchUser } from '../features/user/userDetailSlice';

const StyledNavBar = styled.nav`
  background-color: #ddd;
  border-radius: 0.5rem;
  margin-bottom: 5rem;
  padding: 1rem;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  font-weight: 600;
  padding: 1.5rem;
  border-radius: 0.4rem;
  transition: 0.3s;
  &:hover {
    background-color: #eee;
  }
  &.active {
    background-color: #fff;
  }
`;

function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { users } = useSelector(state => state.user);
  const usersCount = users.length;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchUser(searchQuery));
  }, [dispatch, searchQuery]);

  return (
    <>
      <StyledNavBar>
        <StyledList>
          <li>
            <StyledLink to="/">Home</StyledLink>
          </li>
          <li>
            <StyledLink to="/create">Create user</StyledLink>
          </li>
          <li>
            <StyledLink to="/all">
              All users {usersCount ? '(' + users?.length + ')' : null}
            </StyledLink>
          </li>
          <li>
            <Input
              placeholder="Search users"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ margin: '0' }}
            />
          </li>
        </StyledList>
      </StyledNavBar>
      <Outlet />
    </>
  );
}

export default NavBar;
