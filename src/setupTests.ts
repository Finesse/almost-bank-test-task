import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({
  adapter: new Adapter()
});

// Enzyme doesn't support React.memo, this is a workaround: https://github.com/airbnb/enzyme/issues/1875
jest.mock('react', () => {
  const r = jest.requireActual('react');

  return { ...r, memo: (x: any) => x };
});
