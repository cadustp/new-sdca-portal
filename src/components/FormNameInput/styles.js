import styled from 'styled-components';

export const Title = styled.div`
  letter-spacing: 0.18px;
  margin: 0;
  margin-bottom: ${props => (props.isMulti ? '8px' : 0)};
  color: ${props => (props.error ? '#E35151' : 'var(--dark-grey-color)')};
  font-size: 12px;
  font-weight: 600;
`;

export const Container = styled.div`
  margin: 0;
  border-bottom: 1px solid var(--light-grey-color);
  line-height: 22px;
`;

export const Input = styled.input`
  font-size: 12px;
  border: 0;
  padding: 10px 0;
  opacity: 0.3
`;

