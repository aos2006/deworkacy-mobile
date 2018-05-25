import * as actionTypes from './actionTypes';
import * as cons from './constants';

export const fetchEvents = ({ from, to, locationId }) => ({
  url: cons.EVENT_API,
  type: actionTypes.fetch_events,
  name: actionTypes.NAME,
  method: 'post',
  params: {
    body: {
      locationId,
      timestampStart: from,
      timestampFinish: to,
    }
  }
})
