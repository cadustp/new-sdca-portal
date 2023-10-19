import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import {
  Card,
  IconButton,
  CardHeader,
  Collapse,
  CardContent,
  makeStyles,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import './styles.css';
import { captureEvent } from '../../analytics';

type Props = {
  title: string,
  children: any,
  style: any
};

const useStyles = makeStyles({
  root: {
    overflow: "visible"
  }
})

const StepperCard: React.FC<Props> = ({
  title,
  children,
  style = {},
}) => {
  const [expandStep, setExpandStep] = useState(true);
  const classes = useStyles()

  return (
    <Card className={`stepper-card ${classes.root}`} style={style}>
      <CardHeader
        style={{ width: '100%' }}
        title={title}
        action={(
          <IconButton
            onClick={() => {
              setExpandStep(!expandStep);
              captureEvent('setExpandStep', { status: !expandStep ? 'expand' : 'collapse' });
            }}
          >
            {expandStep ? <KeyboardArrowUp /> : <KeyboardArrowDown /> }
          </IconButton>
              )}
      />
      <Collapse in={expandStep} timeout="auto">
        <CardContent className="step-content">
          <>
            {children}
          </>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default injectIntl(StepperCard);
