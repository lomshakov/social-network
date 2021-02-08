import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import ProfileStatus from './ProfileStatus'
import updateStatus from './../../../Redux/profile-reducer'


describe("Profile Status component basic tests", () => {
    const testMessage = 'Test status message'

    test('Status should display correctly', () => {
        const { container } = render(<ProfileStatus status={testMessage} updateStatus={updateStatus as any}/>)

        expect(screen.queryByText(testMessage)).toBeDefined()
        expect(screen.getByText(testMessage)).toBeInTheDocument()
    })

    test('After render <span> should be in DOM, but <input> - not', () => {
        const { container } = render(<ProfileStatus status={testMessage} updateStatus={updateStatus as any}/>)
        const span = container.querySelector('span');
        const input = container.querySelector('input');

        expect(span).toBeDefined()
        expect(input).toBeNull()
    })

    test('Edit mode should be enabled by mouse double click', () => {
        const mockCallback = jest.fn();
        const { container }: any = render(<ProfileStatus status={testMessage} updateStatus={mockCallback}/>)

        userEvent.dblClick(container.querySelector('span'))
        fireEvent.blur(container.querySelector('input'))

        expect(mockCallback).toBeCalled()
    })

})
