import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { Close } from "@mui/icons-material"

import Loading from '../../../components/Loading';
import CustomSnackbar from '../../../components/shared/CustomSnackbar/CustomSnackbar';
import AdvancedTab from "./Tabs/AdvancedTab"
import SimpleTab from './Tabs/SimpleTab';
import SharingTab from './Tabs/SharingTab';
import ConditionalTab from './Tabs/ConditionalTab/ConditionalTab';
import { SNACKBAR_VARIANTS } from '../../../helpers/consts';
import { StateProps , Props, DispatchProps } from "./types";
import {
  CloseBarContainer,
  CloseBarItem,
  HeaderContainer,
  StyledContainer,
  PaperContainer
} from "./styles";

enum TabsTypes {
  SIMPLE = 'simple',
  ADVANCED = 'advanced',
  SHARING ='sharing',
  CONDITIONAL = 'conditional'
}

const SideBarConfig: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  form,
  setFormSettings,
  handleShareMode,
  clearLoadUsersStatus,
  onClose,
  loadingLists,
  loadFailure,
  showSideBar,
  shareMode,
  loadAvailableUsers,
  listsDataRequest,
  availableUsers,
  forms
}) => {
  const [activeTab, setActiveTab] = useState(TabsTypes.ADVANCED);

  useEffect(() => {
    if (!availableUsers.length) loadAvailableUsers();
    if (!forms.length) listsDataRequest({ forms: true });
  }, [])

  const LoadErrorsSnackBar = () => (
    <CustomSnackbar
      data={{
        message: intl.messages['utils.errorLoadingOptions'],
        type: SNACKBAR_VARIANTS.ERROR,
        open: loadFailure,
      }}
      handleClose={clearLoadUsersStatus}
    />
  );

  const renderHeader = () => (
    <Tabs
      value={activeTab}
      onChange={(event, newValue) => { setActiveTab(newValue); }}
      indicatorColor="primary"
      textColor="primary"
    >
      {Object.keys(TabsTypes).map((tab, key) => (
        !(TabsTypes[tab] === 'conditional' && form?.publicLink.active) && (
          <Tab
            label={intl.messages[`forms.create.tab.${TabsTypes[tab]}`]}
            value={TabsTypes[tab]}
            key={key}
          />
        )
      ))}
    </Tabs>
  );

  const renderTab = () => (
    <>
      {activeTab === TabsTypes.SIMPLE && (<SimpleTab form={form} setFormSettings={setFormSettings} />)}
      {activeTab === TabsTypes.ADVANCED && (<AdvancedTab form={form} forms={forms} setFormSettings={setFormSettings} />)}
      {activeTab === TabsTypes.SHARING && (<SharingTab form={form} setFormSettings={setFormSettings} handleShareMode={handleShareMode} shareMode={shareMode} availableUsers={availableUsers} />)}
      {activeTab === TabsTypes.CONDITIONAL && (<ConditionalTab intl={intl} setFormSettings={setFormSettings} form={form}/>)}
    </>
  );

  if(!showSideBar){
    return (
      <></>
    )
  }

  if(loadingLists){
    return (
      <Loading size="small"/>
    )
  }

  return (
    <>
      <PaperContainer elevation={2}>
        <StyledContainer>
            <HeaderContainer>
              <CloseBarContainer>
                <CloseBarItem onClick={() => onClose()}>
                  <Close />
                </CloseBarItem>
              </CloseBarContainer>
            </HeaderContainer>
            <div>
              {renderHeader()}
              {renderTab()}
            </div>
        </StyledContainer>
      </PaperContainer>
      <LoadErrorsSnackBar />
    </>
  )
}

export default SideBarConfig;