import styled from "styled-components";

export const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const DescriptionContainer = styled.div`
  margin-bottom: 16px;
`;

export const FeatureItemContainer = styled.div`
  padding-bottom: 16px;
  padding-top: 16px;
`;

export const FeatureItemTitle = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
`;

export const FeatureItemDescription = styled.div`
  color: #838383;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2%;
  font-weight: 600;
  padding-right: 8%;
  padding-left: 8%;
  border: 0;
  flex: 1;
`;

export const Header = styled.div`
  border: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  color: var(--dark-grey-color);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.18px;
  margin: 12px 0 20px 0;
`;
