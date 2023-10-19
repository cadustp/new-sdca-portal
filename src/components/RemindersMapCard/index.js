import React, { useEffect, useState } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup, ZoomControl,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { RoomOutlined, InfoOutlined } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import moment from '../../timezones/moment';
import { fetchRemindersWithLocation, closeSnackbar } from '../../redux/appUserReminders/actions';
import NewFilter from '../shared/NewFilter/NewFilter';
import FilterIcon from '../shared/Icons/FilterIcon';
import { FilterTabs, SNACKBAR_VARIANTS } from '../../helpers/consts';
import { tabs } from '../shared/NewFilter/FilterDialog/FilterDialog';
import './style.css';
import marker from '../../assets/icons/marker.svg';
import Loading from '../Loading';
import CustomSnackbar from '../shared/CustomSnackbar/CustomSnackbar';
import { captureEvent } from '../../analytics';

const Leaflet = window.L;

const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileLayerAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const markerIcon = window.L.icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  iconAnchor: [13, 35],
  popupAnchor: [0, -35],
  iconSize: [26, 35],
});

const mapDispatchToProps = dispatch => ({
  handleFetchRemindersWithLocation: body => dispatch(fetchRemindersWithLocation({ body })),
  handleCloseSnackBar: () => dispatch(closeSnackbar()),
});

const mapStateToProps = state => ({
  reminders: state.appUserReminders.remindersLocations,
  isLoading: state.appUserReminders.infiniteLoading,
  snackbarState: state.appUserReminders.snackbarState,
});

const RemindersMapCard = ({
  date, reminders, isLoading, snackbarState, handleCloseSnackBar, handleFetchRemindersWithLocation, intl,
}) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    fetchData(null);
  }, [date.startDate, date.endDate]);

  useEffect(() => {
    if (map && reminders.length > 0) {
      fitMap();
    }
  }, [reminders]);

  const fetchData = selecteds => {
    const forms = selecteds?.forms ?? [];
    const appUsers = selecteds?.appUsers ?? [];
    const valuatedUsers = selecteds?.employees ?? [];

    handleFetchRemindersWithLocation({
      data: {
        selectedStartDate: date.startDate,
        selectedEndDate: date.endDate,
        selectedForms: forms.map(f => (
          { value: f }
        )),
        selectedAppUsers: appUsers.map(f => (
          { value: f }
        )),
        selectedValuatedUsers: valuatedUsers.map(f => (
          { value: f }
        )),
      },
    });
  };

  const fitMap = () => {
    const boundsCoords = reminders.map(m => (
      [m.location.latitude, m.location.longitude]
    ));

    const bounds = Leaflet.latLngBounds(boundsCoords);

    map.fitBounds(bounds);
  };

  const formatUsers = appUsers => appUsers.map(user => user.name).join(', ');

  const LoadingState = () => (isLoading
    ? (
      <Loading size="small" />
    )
    : <></>);

  return (
    <div className="reminders-map-card">
      <div className="title">
        <div className="section">
          <p>{intl.messages['reminders_map.card_title']}</p>
          <Tooltip placement="top" arrow title={intl.messages['reminders_map.tooltip.precision']}>
            <InfoOutlined
              fontSize="medium"
              style={{ color: '#6A6A6A', marginLeft: '10px' }}
            />
          </Tooltip>

        </div>
        <div>
          <NewFilter
            filterIcon={<FilterIcon color="primary" />}
            callBack={fetchData}
            selectedTab={tabs.FORM}
            enabledTabs={[FilterTabs.FORM, FilterTabs.WORKER, FilterTabs.APP_USER]}
            includeTraining={false}
          />
        </div>
      </div>
      <div className="leaflet-container">
        <MapContainer whenCreated={setMap} center={[-25, -50]} zoom={1} zoomControl={false}>
          <TileLayer
            attribution={tileLayerAttribution}
            url={tileLayerUrl}
          />
          <MarkerClusterGroup>
            {reminders.map((marker, key) => (
              <Marker
                key={key}
                position={[marker.location.latitude, marker.location.longitude]}
                icon={markerIcon}
                eventHandlers={{
                  click: () => {
                    captureEvent('reminderMarkerClicked');
                  },
                }}
              >
                <Popup className="map-popup">
                  <div>
                    <span>
                      {`${intl.messages['reminders_map.popup.app_user']} `}
                    </span>
                    {marker.app_user.name}
                  </div>
                  <div>
                    <span>
                      {`${intl.messages['reminders_map.popup.valuated_user']} `}
                    </span>
                    {formatUsers(marker.valuated_users)}
                  </div>
                  <div>
                    <span>
                      {`${intl.messages['reminders_map.popup.date']} `}
                    </span>
                    {moment(marker.score_date).format('DD/MM/YYYY HH:mm')}
                  </div>
                  <div>
                    <span>
                      {`${intl.messages['reminders_map.popup.score']} `}
                    </span>
                    {marker.score ? `${marker.score}%` : ''}
                  </div>
                  <div>
                    <span>
                      {`${intl.messages['reminders_map.popup.form']} `}
                    </span>
                    {marker.form.name}
                  </div>
                  <div>
                    {marker.location.latitude}
                    ,
                    {marker.location.longitude}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
          ;
          <ZoomControl position="topright" />
          <div className="inner-card">
            <RoomOutlined
              fontSize="large"
              style={{ color: '#6A6A6A', marginRight: '10px' }}
            />
            <div>
              <div className="title">
                {
                intl.formatMessage(
                  { id: 'reminders_map.map.reminders_number' },
                  { number: reminders.length }
                )
              }
              </div>
              <div className="subtitle">{intl.messages['reminders_map.map.reminders_number_text']}</div>
            </div>
          </div>
        </MapContainer>
      </div>
      <LoadingState />
      <CustomSnackbar
        data={{
          message: intl.messages['reminders_map.request_error'],
          type: SNACKBAR_VARIANTS.ERROR,
          open: snackbarState.open,
        }}
        handleClose={handleCloseSnackBar}
      />
    </div>
  );
};

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(RemindersMapCard)
);
