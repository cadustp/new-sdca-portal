import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% + 108px);
  padding: 16px 54px;
  background: white;
  margin: 0 -54px;
  border-bottom: 1px solid #ddd;
  min-height: 88px;

  .skeleton-space {
    margin-left: 8px;
  }

  .general-info {
    display: flex;
    flex: 1;

    .title-container {
      display: flex;
      flex-direction: column;
    }

    .title {
      margin-bottom: 8px;
    }

    .status {
      font-size: 12px;
      color: ${({ theme }) => theme.light.gray.light};
    }

    .back-button {
      align-self: center;
    }
  }

  .buttons-section {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    .subsection {
      display: flex;
      align-items: center;

      & > svg:not(:last-child) {
        margin-right: 8px;
      }

      &:not(:last-child)::after {
        content: '';
        display: inline-block;
        margin: 0 16px;
        width: 2px;
        height: 16px;
        background-color: ${({ theme }) => theme.text.dark};
      }
    }
  }

  @media screen and (min-width: 1961px) {
    padding: 16px 20%;
  }
`;
