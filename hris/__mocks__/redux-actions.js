const createAction = (type, payloadCreator) => {
  const actionCreator = (...args) => {
    const payload = payloadCreator ? payloadCreator(...args) : args[0];
    return { type, payload };
  };

  actionCreator.toString = () => type.toString();
  return actionCreator;
};

const handleActions = (reducerMap, defaultState) => {
  return (state = defaultState, action) => {
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action) : state;
  };
};

module.exports = {
  createAction,
  handleActions,
};
