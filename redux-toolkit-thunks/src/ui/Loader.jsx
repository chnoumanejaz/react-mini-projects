import styled from 'styled-components';
import './loader.css';

const StyledLoader = styled.div`
  text-align: center;
  height: 100vh;
`;

function Loader() {
  //   return <StyledLoader>Loading ...</StyledLoader>;

  return (
    <StyledLoader>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </StyledLoader>
  );
}

export default Loader;
