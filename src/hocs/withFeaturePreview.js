import React from 'react';
import Loading from 'src/components/Loading';

import { connect } from 'react-redux';

const withFeaturePreview = Component => props => {
  const currentLocation = window.location.href
  const { features } = props
  const token = localStorage.getItem("token")

  const currentFeature = features.find(featureItem => currentLocation === featureItem?.routes?.current);
  
  if(currentFeature?.preview){
    window.location.replace(`${currentFeature?.routes?.preview}?token=${token}`)
    
    return <Loading size="small" />
  }else {
    return <Component {...props} />
  }
}

const mapStateToProps = state => ({
  features: state.features.features,
});

export default Component => connect(
  mapStateToProps,
)(withFeaturePreview(Component));
