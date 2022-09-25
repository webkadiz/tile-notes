import {fireEvent, render, screen} from '@testing-library/react'
import TaskCard from './index'

describe('Remove button', () => {
    test('Render without remove button when card open', () => {
        render(<TaskCard withRemove isOpen />)

        const btn = screen.queryByRole('button', {
            name: 'Close Icon',
        })

        expect(btn).toBeNull()
    })

    test('Render with remove button', () => {
        const onRemove = jest.fn()

        render(<TaskCard withRemove isOpen={false} onRemove={onRemove} />)

        const btn = screen.getByRole('button', {
            name: 'Close Icon',
        })

        fireEvent.click(btn)

        expect(onRemove).toHaveBeenCalled()
    })
})
