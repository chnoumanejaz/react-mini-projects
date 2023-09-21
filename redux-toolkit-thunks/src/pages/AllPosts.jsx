import styled from 'styled-components';
import UserCard from '../ui/UserCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/user/userDetailSlice';
import Loader from '../ui/Loader';
import Error from '../ui/Error';
import { Input } from '../ui/Input';

const Row = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const RowContainer = styled.div`
  max-width: 60%;
  margin: 0 auto;
  background-color: #dddddd;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 2px 5px rgba(0, 0, 0, 0.4);
  & h2 {
    text-align: center;
  }
`;

const FilterContainer = styled.div`
  background-color: #eee;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  border-radius: 0.5rem;
  width: 50%;
  margin: 0 auto;
  & p {
    font-weight: 600;
    opacity: 0.8;
  }
  & div {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  & div input {
    margin: 0;
    width: 2rem;
    height: 2rem;
    accent-color: #222;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
`;

function AllPosts() {
  const [filter, setFilter] = useState('all');

  const dispatch = useDispatch();
  const { users, isLoading, error, searchQuery } = useSelector(
    state => state.user
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (isLoading) return <Loader />;

  if (error) return <Error message={error} />;

  if (!users.length)
    return (
      <RowContainer>
        <h2>There is no user yet</h2>
        <p>Try Creating new user 🙂</p>
      </RowContainer>
    );

  return (
    <RowContainer>
      <h2>All Users</h2>
      <FilterContainer>
        <p>Filter: </p>
        <div>
          <Input
            type="radio"
            name="sex"
            value="all"
            checked={filter === 'all'}
            onChange={e => setFilter(e.target.value)}
            id="all"
          />
          <label htmlFor="all">All</label>
        </div>
        <div>
          <Input
            type="radio"
            name="sex"
            value="male"
            id="male"
            checked={filter === 'male'}
            onChange={e => setFilter(e.target.value)}
          />
          <label htmlFor="male">Male</label>
        </div>
        <div>
          <Input
            type="radio"
            name="sex"
            value="female"
            id="female"
            checked={filter === 'female'}
            onChange={e => setFilter(e.target.value)}
          />
          <label htmlFor="female">Female</label>
        </div>
      </FilterContainer>

      <Row>
        {users
          .filter(user => {
            if (!searchQuery) return user;
            else
              return user.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
          })
          .filter(user => {
            if (filter === 'male') return user.sex === filter;
            if (filter === 'female') return user.sex === filter;
            else return user;
          })
          .map(user => (
            <UserCard user={user} key={user.id} />
          ))}
      </Row>
    </RowContainer>
  );
}

export default AllPosts;
