import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled.div`
  max-width: 60%;

  margin: 0 auto;
  background-color: #dddddd;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 2px 5px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Home() {
  const { searchQuery } = useSelector(state => state.user);
  const navigate = useNavigate();
  
  if (searchQuery.length >= 1) navigate('/all');

  return (
    <Container>
      <h2>React Redux Toolkit</h2>
      <p>
        Just practicing the complete <b> @redux/toolkit </b> with promises
        handling, state managements, error handling and many other things
      </p>
      <p>
        <b> Stylings with the use of @Styled-Components</b>
      </p>
      <p>
        <a
          href="https://github.com/chnoumanejaz"
          target="_blank"
          rel="noreferrer">
          Muhammad Nouman Ejaz
        </a>
      </p>
    </Container>
  );
}

export default Home;
