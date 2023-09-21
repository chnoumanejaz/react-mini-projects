import styled, { css } from 'styled-components';
import { Button } from './Button';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../features/user/userDetailSlice';
import { Link } from 'react-router-dom';

const Card = styled.div`
  background-color: #fff;
  padding: 2rem 3rem;
  border-radius: 0.5rem;
  width: 48%;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  }
`;

const P = styled.p`
  font-size: 1.3rem;
  white-space: nowrap;
`;

const Gender = styled.p`
  font-size: 1.3rem;
  font-weight: 800;
  opacity: 0.8;
  text-transform: capitalize;
  padding: 0 0.5rem;
  width: fit-content;
  border-radius: 0.4rem;
  background-color: orange;

  ${props =>
    props.sex === 'male' &&
    css`
      background-color: yellowgreen;
    `}
`;

const FieldName = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  opacity: 0.9;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

function UserCard({ user }) {
  const { name, email, sex, city, age, id } = user;
  const dispatch = useDispatch();
console.log(user)
  return (
    <Card>
      <div>
        <h3>{name}</h3>
        {sex === 'female' ? (
          <Gender>{sex}</Gender>
        ) : (
          <Gender sex="male">{sex}</Gender>
        )}
      </div>
      <Details>
        <P>
          <FieldName> Email:</FieldName> {email}
        </P>
        <P>
          <FieldName> Age:</FieldName> {age}
        </P>
        <P>
          <FieldName> City:</FieldName> {city}
        </P>
      </Details>
      <ButtonsContainer>
        <Link to={`/update/${id}`}>
          <Button size="small">Edit</Button>
        </Link>
        <Button
          size="small"
          variation="danger"
          onClick={() => dispatch(deleteUser(id))}>
          Delete
        </Button>
      </ButtonsContainer>
    </Card>
  );
}

export default UserCard;
