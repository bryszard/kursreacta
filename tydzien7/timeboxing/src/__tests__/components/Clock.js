import React from 'react';
import Clock from '../../components/Clock';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

describe('<Clock />', () => {
  it('sets text to empty string as default', () => {
    expect(<Clock remainingTime={10} />).toEqual(<Clock remainingTime={10} text="" />)
  })

  describe('when rendered component with ReactDOM', () => {
    let root;

    beforeEach(() => {
      root = document.createElement('div');
      ReactDOM.render(<Clock remainingTime={10000785} />, root)
    })

    it('renders h2 element', () => {
      expect(root.childNodes[0].nodeName).toEqual('H2')
    })

    it('renders time in HH:MM:SS:MMM format', () => {
      expect(root.childNodes[0].textContent).toEqual('02:46:40:785')
    })
  })

  describe('when rendered component with TestRenderer', () => {
    let clockRenderer;

    beforeEach(() => {
      clockRenderer = renderer.create(
        <Clock remainingTime={10000785} />
      )
    })

    it('renders properly', () => {
      expect(clockRenderer.toJSON()).toMatchSnapshot()
    })
  })
})
