import React, { useEffect } from 'react';
import { Switch, CircularProgress} from "@material-ui/core";

import SideMenu from 'src/components/SideBar';
import { 
  Header, 
  Content, 
  Title,
  DescriptionContainer,
  CenterContainer,
  FeatureItemContainer,
  FeatureItemTitle,
  FeatureItemDescription
} from "./styles";

function FeatureItem({
  title,
  description,
  preview,
  changePreviewEnabled,
}){
  return (
    <FeatureItemContainer>
      <FeatureItemTitle>
        <div>{title}</div>
        <div>
          <Switch
            checked={preview}
            value={preview}
            onChange={changePreviewEnabled}
            color="primary"
          />
        </div>
      </FeatureItemTitle>
      <FeatureItemDescription>
        {description}
      </FeatureItemDescription>
    </FeatureItemContainer>
  )
}

interface StateProps {
  isOpen: boolean,
  features: Array<any>,
  loadingFeatures: boolean,
  intl: { 
    messages: object
  }
  handleCloseTab: Function,
};

interface DispatchProps {
  updateFeaturesRequest: Function,
  getFeaturesRequest: Function
};

const FeaturePreviewMenu: React.FC<StateProps & DispatchProps> = ({
  isOpen,
  intl,
  features,
  loadingFeatures,
  updateFeaturesRequest,
  getFeaturesRequest,
  handleCloseTab
}) => {

  useEffect(() => {
    getFeaturesRequest()
  }, [])

  const handleUpdateFeaturesUser = (e, featureId) => {
    updateFeaturesRequest({
      featureId: featureId, 
      preview: e.target.checked
    })
  }

  const renderSideMenuContent = () => {
    return (
      <div>
        <Content>
          <Header>
            <Title>
              {intl.messages['features_preview.title']}
            </Title>
            <DescriptionContainer>
              {intl.messages['features_preview.description']}
            </DescriptionContainer>
          </Header>
          {features.map(featureItem => (
            <FeatureItem 
              key={featureItem.id}
              title={intl.messages[`${featureItem.translation_key}.title`]} 
              description={intl.messages[`${featureItem.translation_key}.description`]}
              preview={featureItem.preview}
              changePreviewEnabled={e => handleUpdateFeaturesUser(e, featureItem.id)} 
            /> 
          ))}
        </Content>
      </div>
    )
  }

  const renderLoading = () => {
    return (
      <CenterContainer>
        <CircularProgress />
      </CenterContainer>
    )
  }

  return (
    <>
      <SideMenu
        active={isOpen}
        onClose={() => handleCloseTab()}
        content={loadingFeatures ? renderLoading() : renderSideMenuContent()}
      />
    </>
  );
};

export default FeaturePreviewMenu;
