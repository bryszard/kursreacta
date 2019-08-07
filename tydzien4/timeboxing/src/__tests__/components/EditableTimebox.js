import React from 'react';

import {
  render,
  fireEvent,
  cleanup,
} from '@testing-library/react'

import 'jest-dom/extend-expect'

import EditableTimebox from '../../components/EditableTimebox';

describe('<EditableTimebox />', () => {

  afterEach(() => {
    cleanup()
  })

  it('shows edit button', () => {
    const { getByText } = render(<EditableTimebox />)
    expect(() => { getByText('Edytuj') }).not.toThrow()
  })

  it('blocks / unblocks editing button the timebox', () => {
    const { getByText } = render(<EditableTimebox />)
    const button_confirm = getByText(/zmiany/)
    const button_edit = getByText('Edytuj')

    expect(button_edit).toHaveAttribute('disabled')
    fireEvent.click(button_confirm)

    expect(button_edit).not.toHaveAttribute('disabled')
    fireEvent.click(button_edit)

    expect(button_edit).toHaveAttribute('disabled', '')
  })

  it('allows editing the timebox title', () => {
    const { getByText } = render(<EditableTimebox />)
    const button_confirm = getByText(/zmiany/)
    const title_input = getByText('Co robisz?').firstElementChild

    expect(title_input.value).toEqual('Uczę się o kontrolowanych komponentach')
    fireEvent.change(title_input, { target: { value: 'Myślę' } })

    expect(title_input.value).toEqual('Myślę')
    fireEvent.click(button_confirm)

    expect(title_input).toHaveAttribute('disabled')

    const title = getByText('Myślę')
    expect(title).toBeVisible()
  })

})
