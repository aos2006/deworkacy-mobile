export const createReducer = (initialState, handlers) => function reducer(state = initialState, action) {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};


export const taggedReducer = (reducer, rName) => (state, action) => {
  const { name } = action;
  const isInitializationCall = state === undefined;
  if (name !== rName && !isInitializationCall) return state;
  return reducer(state, action);
};


export const checkingApp = (href, fallback) => {
  const appWindow = window.open(href, "_blank");
  appWindow.onclose = () => {
    return true;
  }
  appWindow.location = fallback;
}
