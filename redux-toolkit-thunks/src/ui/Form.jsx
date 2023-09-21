import styled from 'styled-components';
import { Input } from './Input';
import { Button, ButtonsRow } from './Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, updateUser } from '../features/user/userDetailSlice';
import { Link, useNavigate } from 'react-router-dom';

const FormDiv = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ddd;
  box-shadow: 0 0 2px 5px rgba(0, 0, 0, 0.4);
  border-radius: 1rem;
`;

const StyledForm = styled.form`
  padding: 1rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const H2 = styled.h2`
  margin: 0 0 0 1.25rem;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  & div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  & div Input {
    width: 2rem;
    height: 2rem;
    margin: 0;
    accent-color: #222;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
`;

function Form({ currentUser = [], updateForm = false }) {
  const [user, setUser] = useState(currentUser[0]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchQuery } = useSelector(state => state.user);

  function setTheUser(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!user.name || !user.sex || !user.email || !user.age || !user.city) {
      alert('Please Fill all the fields');
      return;
    }

    if (updateForm) dispatch(updateUser(user));
    else dispatch(createUser(user));

    navigate('/all');
  }
  if (searchQuery.length > 0) navigate('/all');

  return (
    <FormDiv>
      <H2>{updateForm ? 'Update' : 'Enter'} User Details</H2>
      <StyledForm onSubmit={handleSubmit}>
        <RadioContainer>
          <div>
            <Input
              type="radio"
              name="sex"
              value="male"
              id="male"
              checked={updateForm ? user?.sex === 'male' : null}
              onChange={setTheUser}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <Input
              type="radio"
              name="sex"
              value="female"
              checked={updateForm ? user?.sex === 'female' : null}
              id="female"
              onChange={setTheUser}
            />
            <label htmlFor="female">Female</label>
          </div>
        </RadioContainer>
        <Input
          placeholder="Enter your name"
          name="name"
          required
          defaultValue={!updateForm ? null : user?.name}
          onChange={setTheUser}
        />
        <Input
          placeholder="Enter your email"
          type="email"
          name="email"
          required
          defaultValue={!updateForm ? null : user?.email}
          onChange={setTheUser}
        />
        <Input
          placeholder="Enter your age"
          name="age"
          type="number"
          required
          defaultValue={!updateForm ? null : user?.age}
          onChange={setTheUser}
        />
        <Input
          placeholder="Enter your city"
          name="city"
          required
          defaultValue={!updateForm ? null : user?.city}
          onChange={setTheUser}
        />
        <ButtonsRow>
          {updateForm ? (
            <Link to={'/all'}>
              <Button type="reset" variation="cancle">
                Cancle
              </Button>
            </Link>
          ) : (
            <Button type="reset" variation="cancle">
              Cancle
            </Button>
          )}

          <Button type="submit">{updateForm ? 'Update' : 'Create new user'}</Button>
        </ButtonsRow>
      </StyledForm>
    </FormDiv>
  );
}

export default Form;
