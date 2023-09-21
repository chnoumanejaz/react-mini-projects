import styled from 'styled-components';

export const Input = styled.input`
  padding: 1.2rem 1.5rem;
  border: none;
  outline: none;
  margin-top: 1.5rem;
  border-radius: 0.5rem;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:focus-within {
    box-shadow: 0 5px 10px 5px rgba(0, 0, 0, 0.1);
  }
`;
