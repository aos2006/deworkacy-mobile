import moment from 'moment';

const convertDate = (from, to) => {
  return {
    timestampStart: from * 1000,
    timestampFinish: to * 1000,
  }
}
export default events => {
  const days = events.reduce((acc, current) => {
    const day = moment(current.timestampStart * 1000)
      .format('D');

    if (acc.days[day] !== undefined) {
      return Object.assign({}, acc, {
        days: {
          ...acc.days,
          [day]: acc.days[day].concat({
            ...current,
            ...convertDate(current.timestampStart, current.timestampFinish),
          }),
        }
      })
    }

    return Object.assign({}, acc, {
      result: acc.result.concat(day),
      days: {
        ...acc.days,
        [day]: [{
          ...current,
          ...convertDate(current.timestampStart, current.timestampFinish)
        }],
      }
    })
  }, {result: [], days: {}});

  return {
    ...days,
    events,
  };
};
// Define a users schema
