import styled from 'styled-components';

export const Container = styled.aside`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 2rem;

  .red {
    background: linear-gradient(90deg, #d9857a 0%, #c86d61 100%);
  }

  .green {
    background: linear-gradient(90deg, #79baa2 0%, #52ad8c 100%);
  }

  .blue {
    background: linear-gradient(90deg, #81c0ea 0%, #5294c2 100%);
  }
`;

export const Card = styled.section`
  border-radius: 4px;
  box-shadow: 0 0 3px 0 #e5e9f2;
  color: #fbfcfe;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &.double {
    display: grid;
    grid-template-columns: 1fr 2px 1fr;
    background: white;
    align-items: center;
    column-gap: 24px;

    .divider {
      width: 1px;
      background-color: ${({ theme }) => theme.light.disabled};
      height: 80px;
    }
  }
`;

export const CardTitle = styled.p`
  font-size: 0.875rem;
`;

export const CardSubtitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

export const CardNumber = styled.p`
  font-size: 1.75rem;
  font-weight: 600;
`;

export const DoubleCardContainer = styled.section`
  background-color: white;
`;

export const DoubleCardItem = styled.section`
  flex: 1;
  color: ${({ theme }) => theme.text.primary};
  padding: 0 12px;
  display: flex;

  .number {
    font-size: 1.75rem;
    margin-right: 1rem;
    font-weight: 600;
    line-height: 0.9;
  }

  .label,
  .subtitle {
    font-size: 0.875rem;
  }

  .label {
    font-weight: 600;
  }

  .subtitle {
    margin-top: 0.5rem;
  }

  .icon-container {
    margin-right: 12px;

    .icon {
      width: 24px;
      height: 24px;
    }
  }
`;
