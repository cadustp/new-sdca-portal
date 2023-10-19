import React, { useEffect, useMemo, useState } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import Skeleton from 'react-loading-skeleton';
import {
  Card,
  CardNumber,
  CardSubtitle,
  CardTitle,
  Container,
  DoubleCardItem,
} from './HomeCardsStyle';

let accomplishedRemindersLabel = '';
let pendingRemindersLabel = '';
let lateRemindersLabel = '';
// let adherenceAccumulatedLabel = '';
// let qualityAccumulatedLabel = '';
let groupLabel = '';
let ofLabel = '';

function HomeCards({ intl, user, quality, status, adherence, loading }) {
  const translate = intl => {
    accomplishedRemindersLabel = intl.formatMessage({
      id: 'home_card.accomplished_reminders',
      defaultMessage: 'Compromissos concluídos',
    });
    pendingRemindersLabel = intl.formatMessage({
      id: 'home_card.pending_reminders',
      defaultMessage: 'Compromissos previstos',
    });
    lateRemindersLabel = intl.formatMessage({
      id: 'home_card.late_reminders',
      defaultMessage: 'Compromissos atrasados',
    });
    // adherenceAccumulatedLabel = intl.formatMessage({
    //   id: 'home_card.adherence_accumulated',
    //   defaultMessage: 'Acumulado Aderência',
    // });
    // qualityAccumulatedLabel = intl.formatMessage({
    //   id: 'home_card.quality_accumulated',
    //   defaultMessage: 'Acumulado Qualidade',
    // });
    groupLabel = intl.formatMessage({
      id: 'home_card.group',
      defaultMessage: 'Grupo',
    });
    ofLabel = intl.formatMessage({ id: 'home_card.of', defaultMessage: 'de' });

    defineMessages({
      accomplishedRemindersLabel: {
        id: 'home_card.accomplished_reminders',
        defaultMessage: 'Compromissos concluídos',
      },
      pendingRemindersLabel: {
        id: 'home_card.pending_reminders',
        defaultMessage: 'Compromissos previstos',
      },
      lateRemindersLabel: {
        id: 'home_card.late_reminders',
        defaultMessage: 'Compromissos atrasados',
      },
      // adherenceAccumulatedLabel: {
      //   id: 'home_card.adherence_accumulated',
      //   defaultMessage: 'Acumulado Aderência',
      // },
      // qualityAccumulatedLabel: {
      //   id: 'home_card.quality_accumulated',
      //   defaultMessage: 'Acumulado Qualidade',
      // },
      groupLabel: { id: 'home_card.group', defaultMessage: 'Grupo' },
      ofLabel: { id: 'home_card.of', defaultMessage: 'de' },
    });
  };

  const [statistic, setStatistic] = useState({
    groupName: '',
    adherenceGroup: '',
    qualityGroup: '',
    qualityPercentage: 0,
    latePercentage: 0,
    accomplishedPercentage: 0,
    adherencePercentage: 0,
    pendingPercentage: 0,
    total: 0,
  });
  useMemo(() => translate(intl), []);

  useEffect(() => {
    calculateValues();
  }, [user, quality, status, adherence]);

  const calculateValues = () => {
    if (
      user.company_group_id &&
      adherence.group.labels.length > 0 &&
      status.group.labels.length > 0 &&
      quality.group.labels.length > 0
    ) {
      const status_index = status.group.id.findIndex(
        id => id === user.company_group_id,
      );
      const total =
        status.group.accomplished[status_index] +
        status.group.pending[status_index] +
        status.group.late[status_index];
      const accomplishedPercentage = Math.round(
        (status.group.accomplished[status_index] * 100) / total,
      );
      const pendingPercentage = Math.round(
        (status.group.pending[status_index] * 100) / total,
      );
      const latePercentage = Math.round(
        (status.group.late[status_index] * 100) / total,
      );
      const qualityGroup = quality.group.userGroupStat;
      const adherenceGroup = adherence.group.userGroupStat;
      const groupName = qualityGroup ? qualityGroup.group.name : 'Indisponível';
      const adherencePercentage = adherenceGroup
        ? Math.round(adherenceGroup.group.adherence * 100)
        : 0;
      const qualityPercentage = qualityGroup ? qualityGroup.group.score : 0;
      setStatistic({
        qualityPercentage,
        adherencePercentage,
        accomplishedPercentage,
        adherenceGroup,
        groupName,
        pendingPercentage,
        qualityGroup,
        latePercentage,
        total,
      });
    }
  };

  const renderNumberSkeleton = useMemo(
    () => <Skeleton width={48} height={48} />,
    [],
  );

  const renderLabelSkeleton = useMemo(
    () => (
      <p>
        <Skeleton width={110} height={16} />
      </p>
    ),
    [],
  );

  const renderGroupSkeleton = useMemo(
    () => <Skeleton width={136} height={16} />,
    [],
  );

  const renderPercentageSkeleton = useMemo(
    () => <Skeleton width={148} height={32} />,
    [],
  );

  return (
    <Container>
      <Card className={`${loading ? '' : 'green'}`}>
        {loading ? (
          renderLabelSkeleton
        ) : (
          <CardTitle>
            {statistic.groupName
              ? `${groupLabel}: ${statistic.groupName}`
              : null}
          </CardTitle>
        )}
        {loading ? (
          renderGroupSkeleton
        ) : (
          <CardSubtitle>{accomplishedRemindersLabel}</CardSubtitle>
        )}
        {loading ? (
          renderPercentageSkeleton
        ) : (
          <CardNumber>
            {Number.isNaN(statistic.accomplishedPercentage)
              ? 0
              : statistic.accomplishedPercentage}
            {'% '}
            {ofLabel} {Number.isNaN(statistic.total) ? 0 : statistic.total}
          </CardNumber>
        )}
      </Card>
      <Card className={`${loading ? '' : 'blue'}`}>
        {loading ? (
          renderLabelSkeleton
        ) : (
          <CardTitle>
            {statistic.groupName
              ? `${groupLabel}: ${statistic.groupName}`
              : null}
          </CardTitle>
        )}
        {loading ? (
          renderGroupSkeleton
        ) : (
          <CardSubtitle>{pendingRemindersLabel}</CardSubtitle>
        )}
        {loading ? (
          renderPercentageSkeleton
        ) : (
          <CardNumber>
            {Number.isNaN(statistic.pendingPercentage)
              ? 0
              : statistic.pendingPercentage}
            {'% '}
            {ofLabel} {Number.isNaN(statistic.total) ? 0 : statistic.total}
          </CardNumber>
        )}
      </Card>
      <Card className={`${loading ? '' : 'red'}`}>
        {loading ? (
          renderLabelSkeleton
        ) : (
          <CardTitle>
            {statistic.groupName
              ? `${groupLabel}: ${statistic.groupName}`
              : null}
          </CardTitle>
        )}
        {loading ? (
          renderGroupSkeleton
        ) : (
          <CardSubtitle>{lateRemindersLabel}</CardSubtitle>
        )}
        {loading ? (
          renderPercentageSkeleton
        ) : (
          <CardNumber>
            {Number.isNaN(statistic.latePercentage)
              ? 0
              : statistic.latePercentage}
            {'% '}
            {ofLabel} {Number.isNaN(statistic.total) ? 0 : statistic.total}
          </CardNumber>
        )}
      </Card>
      {/* <Card className="double">
        <DoubleCardItem className="item">
          <div aria-hidden="true" className="icon-container">
            <img
              src={require('../../../../assets/icons/layers.svg')}
              className="icon"
              alt=""
            />
          </div>
          <div>
            {loading ? (
              renderNumberSkeleton
            ) : (
              <span className="number">
                {`${statistic.adherencePercentage}%`}
              </span>
            )}
            {loading ? (
              renderLabelSkeleton
            ) : (
              <p className="label">{adherenceAccumulatedLabel}</p>
            )}
            {loading ? (
              renderGroupSkeleton
            ) : (
              <p className="subtitle">
                {statistic.groupName
                  ? `${groupLabel}: ${statistic.groupName}`
                  : null}
              </p>
            )}
          </div>
        </DoubleCardItem>
        <div className="divider" />
        <DoubleCardItem className="item">
          <div aria-hidden="true" className="icon-container">
            <img
              src={require('../../../../assets/icons/layers.svg')}
              className="icon"
              alt=""
            />
          </div>
          <div>
            {loading ? (
              renderNumberSkeleton
            ) : (
              <span className="number">{`${statistic.qualityPercentage}%`}</span>
            )}
            {loading ? (
              renderLabelSkeleton
            ) : (
              <p className="label">{qualityAccumulatedLabel}</p>
            )}
            {loading ? (
              renderGroupSkeleton
            ) : (
              <p className="subtitle">
                {statistic.groupName
                  ? `${groupLabel}: ${statistic.groupName}`
                  : null}
              </p>
            )}
          </div>
        </DoubleCardItem>
      </Card> */}
    </Container>
  );
}

export default injectIntl(HomeCards);
