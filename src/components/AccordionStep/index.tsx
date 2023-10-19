import React from 'react';
import { injectIntl } from 'react-intl';
import Accordion from '@material-ui/core/Accordion';
import Box from '@material-ui/core/Box';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { light } from '../../styles/palette';
import {
  SCardTitle,
  SAnsweredCard,
  SPercentageGradient,
  STotalAnswers,
  STotalGradient,
  SFakeSkeleton,
  useStyles,
} from './styles';
import { captureEvent } from '../../analytics';

function getGradientColor({ completed, total }) {
  switch (completed) {
    case 0:
      return {
        answeredCard: [light.orangeLight, light.orangeDark],
        progress: [light.grayLight, light.grayLight],
      };
    case completed > 0 && completed < total:
      return {
        answeredCard: [light.orangeLight, light.orangeDark],
        progress: [light.orangeLight, light.orangeDark],
      };
    case total:
      return {
        answeredCard: [light.greenLight, light.greenDark],
        progress: [light.greenLight, light.greenDark],
      };
    default:
      return {
        answeredCard: [light.greenLight, light.greenDark],
        progress: [light.greenLight, light.greenDark],
      };
  }
}

type Props = {
  title: string;
  onClick: Function;
  completed?: number;
  total?: number;
  intl: {
    messages: [];
    formatMessage: Function;
  };
  loading: boolean;
  isExpanded: boolean
};

const AccordionStep: React.FC<Props> = ({
  title,
  completed = 0,
  total = 0,
  isExpanded,
  loading = false,
  intl,
  children,
}) => {
  const cardColor = getGradientColor({ completed, total });
  const text = `${completed}/${total} ${intl.messages['answer.answered']}`;
  const [expanded, setExpanded] = React.useState<boolean>(isExpanded);
  const classes = useStyles();

  return (
    <Box width="100%" maxWidth="900px" mt={2}>
      <Accordion
        expanded={expanded}
        onChange={() => {
          setExpanded(!expanded);
          captureEvent('expandStep', { isExpanded: !expanded });
        }}
        className={classes.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.accordionSummary}
        >
          <Box display="flex" flexDirection="column">
            {loading ? (
              <>
                <SFakeSkeleton width={240} height={16} />
                <SFakeSkeleton width={160} height={16} />
              </>
            ) : (
              <SCardTitle numberOfLines={3}>{title}</SCardTitle>
            )}
            {loading ? (
              <SFakeSkeleton width={128} height={32} />
            ) : (
              <SAnsweredCard
                colors={completed ? cardColor.answeredCard : ''}
              >
                <STotalAnswers variant={completed === 0 ? 'dark' : 'light'}>
                  {text}
                </STotalAnswers>
              </SAnsweredCard>
            )}
            <STotalGradient>
              <SPercentageGradient
                colors={cardColor.progress}
                percentage={Math.round(
                  (Number(completed) / Number(total)) * 100,
                )}
              />
            </STotalGradient>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default React.memo(injectIntl(AccordionStep));
