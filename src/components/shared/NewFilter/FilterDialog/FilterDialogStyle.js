import styled from 'styled-components';

export const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  justify-content: space-between;
`;

export const SelectedItensSpan = styled.span`
  font-size: 14px;
`;

export const styles = () => ({
  iconButtonStyle: {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#4A4A4A',
    'font-size': '16px',
    cursor: 'pointer',
    textAlign: 'right',
  },
  closeFilterButton: {
    width: '118px',
    height: '30px',
    color: '#FFF',
    'border-radius': '24px',
    fontSize: '14px',
    'font-weight': '500',
    'line-height': '15px',
    'text-align': 'center',
    'box-shadow': 'none',
    'text-transform': 'none',
    marginRight: '24px',
  },
  filterIconButton: {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#4A4A4A',
    'font-size': '16px',
    cursor: 'pointer',
    float: 'right',
  },
  container: {
    'font-size': '12px',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    padding: '0px',
    'align-items': 'center',
  },
  datePicker: {
    display: 'flex',
    'font-size': '12px',
    'letter-spacing': '0.62px',
    height: '19px',
    padding: '0px',
    'min-width': '50px',
    'max-width': '110px',
  },
});
