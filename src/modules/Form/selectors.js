export const getState = (state, name) => state[name];

export const getField = (formName, fieldName) => state => {
  const s = getState(state, formName);
  return s.getIn([fieldName]);
};


export const getReqBody = (name, state) => {
  switch (name) {
    case 'expressOrder':
      return {
        contactName: state.getIn(['person', 'val']),
        phone: state.getIn(['tel', 'val']),
        type: state.getIn(['orderType', 'val']),
      };

    case 'programForm':
      return {
        companyName: state.getIn(['companyName', 'val']),
        contactName: state.getIn(['person', 'val']),
        email: state.getIn(['email', 'val']),
        comment: state.getIn(['comment', 'val']),
        productId: state.getIn(['product', 'val']),
        phone: state.getIn(['tel', 'val']),
      };

    case 'reviewForm':
      return {
        contactName: state.getIn(['person', 'val']),
        comment: state.getIn(['comment', 'val']),
        companyName: state.getIn(['companyName', 'val']),
      };

    case 'simpleOrder':
      return {
        companyName: state.getIn(['companyName', 'val']),
        contactName: state.getIn(['person', 'val']),
        email: state.getIn(['email', 'val']),
        comment: state.getIn(['comment', 'val']),
        phone: state.getIn(['tel', 'val']),
        eventInfo: {
          guestCountId: state.getIn(['personQuantity', 'val']),
          additionalServicesIds: state.getIn(['additionalServices', 'val']),
        },
      };
    case 'workSpaceForm':
      return {
        locationId: state.getIn(['loc', 'val']),
        workspaceId: state.getIn(['space', 'val']),
        contactName: state.getIn(['person', 'val']),
        email: state.getIn(['email', 'val']),
        phone: state.getIn(['tel', 'val']),
      };
    case 'subscribe':
      return {
        contactName: state.getIn(['person', 'val']),
        email: state.getIn(['email', 'val']),
        role: state.getIn(['role', 'val']),
      };

    default:
      return {};
  }
}

export default { getState, getField, getReqBody };
