import React from 'react';
import ProgressBar from '../../components/ProgressBar';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

describe('<ProgressBar />', () => {
  describe('when rendered with ReactDOM', () => {
    let root;

    beforeEach(() => {
      root = document.createElement('div');
      ReactDOM.render(<ProgressBar remaining={100} total={1000} />, root)
    })

    it('assigns className to ProgressBar', () => {
      expect(root.childNodes[0].className).toEqual('ProgressBar')
    })

    it('has width of 10%', () => {
      expect(root.childNodes[0].childNodes[0].style).toHaveProperty('width', '10%')
    })
  })

  describe('when rendered with react-test-renderer', () => {
    let component;

    beforeEach(() => {
      component = renderer.create(
        <ProgressBar remaining={100} total={1000} />
      )
    })

    it('renders component properly', () => {
      expect(component).toMatchSnapshot()
    })

    it('assigns className to ProgressBar', () => {
      expect(component.toJSON().props).toMatchObject({'className': 'ProgressBar'})
    })

    it('has width of 10%', () => {
      expect(component.toJSON().children[0].props.style).toMatchObject({'width': '10%'})
    })
  })

})
