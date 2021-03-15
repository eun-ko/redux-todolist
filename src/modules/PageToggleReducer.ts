const TOGGLE_PAGE = 'pages/TOGGLE_PAGE';

export const togglePage = () => ({
  type: TOGGLE_PAGE,
});

const initialState = false;

const PageToggleReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case TOGGLE_PAGE:
      return !state;
    default:
      return state;
  }
};
export default PageToggleReducer;
