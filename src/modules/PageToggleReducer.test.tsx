import PageToggleReducer, { togglePage } from './PageToggleReducer';

describe('<PageToggleReducer/>', () => {
  it('test togglePage action', () => {
    const state = PageToggleReducer(false, togglePage());
    expect(state).toBe(true);
  });
});
