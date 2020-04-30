import styled from 'styled-components';

const TextField = styled.div`
  margin-bottom: 1em;
`;

const Label = styled.label`
  display: inline-block;
  margin-bottom: .5rem;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 1.5em;
  padding: .5em;
  font-size: 1em;
  border: 1px solid ${({ theme }) => theme.colors.grey20};
  border-radius: ${({ theme }) => theme.main.borderRadius};
`;

export {
  TextField,
  Label,
  Input,
};
