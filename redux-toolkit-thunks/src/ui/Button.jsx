import styled, { css } from 'styled-components';

const variations = {
  cancle: css`
    background-color: #eee;
    color: #777;
  `,
  danger: css`
    background-color: red;
    color: #eee;
  `,

  main: css`
    background-color: #777;
    color: #eee;
  `,
};

const sizes = {
  small: css`
    padding: 0.5rem 1rem;
    font-weight: 400;
    font-size: 1.4rem;
  `,

  main: css`
    padding: 1rem 1.5rem;
    font-weight: 600;
  `,
};

export const Button = styled.button`
  border: 1px solid transparent;
  outline: none;
  margin-top: 2rem;
  border-radius: 0.5rem;
  letter-spacing: 0.1rem;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0.9;
  ${props => variations[props.variation]}
  ${props => sizes[props.size]}

  &:hover,
  &:focus-within {
    opacity: 1;
  }
`;

Button.defaultProps = {
  variation: 'main',
  size: 'main',
};

export const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;

  gap: 2rem;
`;
