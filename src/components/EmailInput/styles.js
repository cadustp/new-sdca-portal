import styled from 'styled-components';

export const Title = styled.div`
  letter-spacing: 0.18px;
  margin: 0;
  margin-bottom: ${props => (props.isMulti ? '8px' : 0)};
  color: ${props => (props.error ? '#E35151' : 'var(--dark-grey-color)')};
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5em;
  transition: 0.3s ease;
`;
export const Container = styled.div`
  margin: 0;
`;
export const ErrorText = styled.p`
  padding-top: 2px;
  margin: 0;
  font-size: 12px;
  color: ${props => props.theme.light.error};
  opacity: ${props => (props.error ? 1 : 0)}
  transition: 0.3s ease;
`;
export const Inline = styled.div`
  display: flex;
  vertical-align: middle;
  flex-grow: 1;
`;

export const IconContainer = styled.div`
  padding-right: ${props => (props.tooltip ? '5px' : '0px')};
`;

export const InputStyle = () => ({
  root: {
    fontSize: 12,
    marginTop: 0,
    fontWeight: 400,
  },
  textField: {
    paddingTop: '4px',
    margin: 'auto',
  },
});
