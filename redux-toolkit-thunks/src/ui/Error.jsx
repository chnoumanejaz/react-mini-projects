import styled from 'styled-components';

const StyledError = styled.div`
  font-size: 2rem;
  text-align: center;
  height: 100vh;
  & div {
    background-color: #f8d7da;
    color: red;
    width: 50%;
    margin: 1rem auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border-left: 5px solid red;
  }
`;

function Error({ message }) {
  return (
    <StyledError>
      <h2>Error :(</h2>
      <div>{message}</div>
    </StyledError>
  );
}

export default Error;
