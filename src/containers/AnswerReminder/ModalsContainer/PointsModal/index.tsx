import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import CustomModal from '../../../../components/CustomModal';
import * as S from './styles';
type Props = {
  visible: boolean;
  setVisible: Function | any;
  title: string;
  exitLabel: string;
  description: string | null;
  pop: string | undefined;
  fluxogram: string | undefined;
  externalLink: string | undefined;
};

const PointsModal: React.FC<Props> = ({
  visible,
  setVisible,
  title,
  exitLabel,
  description,
  pop,
  fluxogram,
  externalLink,
}) => {
  return (
    <CustomModal
      open={visible}
      title={title}
      onClose={setVisible}
      loading={false}
    >
      <Box width="100%" pl={5} pr={5}>
        {externalLink && (
          <>
             <Box display="flex" flexDirection="column" whiteSpace="pre" mt={4}>
              <S.Subtitle>Link externo</S.Subtitle>
              <S.Line />
            </Box>

            <Box mt={3} mb={4} display="flex" alignItems="flex-end" justifyContent="space-between" flexWrap="wrap">
              <Typography color="primary">{externalLink}</Typography>
              <a href={externalLink} target="_blank" download>
                <S.ButtonLink>Visitar</S.ButtonLink>
              </a>
            </Box>
          </>
        )}

        {description && (
          <>
             <Box display="flex" flexDirection="column" whiteSpace="pre" >
              <S.Subtitle>Descrição</S.Subtitle>
              <S.Line />
            </Box>

            <Box mt={4} mb={4}>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </Box>
          </>
        )}

        {(pop || fluxogram) && (
            <Box mt={4} mb={4}>
              <Box display="flex" flexDirection="column" whiteSpace="pre" >
                <S.Subtitle>Anexos</S.Subtitle>
                <S.Line />
              </Box>

              <Box display="flex" mt={4}>
                <>
                  {pop && (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <Paper elevation={1}>
                        <embed src={pop} width="100px" />
                      </Paper>

                      <a href={pop} target="_blank" download>
                        <S.ButtonLink>Download</S.ButtonLink>
                      </a>
                    </Box>
                  )}

                  {fluxogram && (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      ml={2}
                    >
                      <Paper elevation={1}>
                        <embed src={fluxogram} width="100px" />
                      </Paper>

                      <a href={fluxogram} target="_blank" download>
                        <S.ButtonLink>Download</S.ButtonLink>
                      </a>
                    </Box>
                  )}
                </>
              </Box>
            </Box>
          )}

        <S.Button onClick={setVisible} isSave={false}>
          {exitLabel}
        </S.Button>
      </Box>
    </CustomModal>
  );
};

export default PointsModal;
