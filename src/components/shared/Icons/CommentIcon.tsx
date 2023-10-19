import React from 'react';
import CheckCircleIcon from './CheckCircleIcon';
import {IconInfoWarning} from './ObservationIcon';
import { ReactComponent as CommentSVG } from '../../../assets/icons/comment.svg';

type Props = {
  width: number;
  height: number;
  iconCheck?: boolean;
  iconWarning?: boolean;
};

const ActionPlanIcon: React.FC<Props> = (
  { width, height, iconCheck, iconWarning },
  props,
) => (
  <div  style={{position:'relative'}}>
    <span style={{ marginRight: '4px', marginTop: '4px' }}>
    <CommentSVG
              width={width}
              height={height}
            />
    </span>
    <span style={{ marginTop: '-15px', position: 'absolute' }}>
      {iconCheck && <CheckCircleIcon width={10} height={10} color="green" />}
      {iconWarning && <IconInfoWarning />}
    </span>
  </div>
);

export default ActionPlanIcon;
