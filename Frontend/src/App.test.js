import { render, screen } from '@testing-library/react'
import App from './App'

beforeEach(() => {
    fetch.resetMocks();
});
const item = {
    description: 'Item 1',
    isCompleted: false,
    id: 'item-1-id'
}
test('renders the footer text', async () => {
    fetch.mockResponseOnce(JSON.stringify([item]));
    render(<App />)
    const footerElement = await screen.findByText(/clearpoint.digital/i)
    expect(footerElement).toBeInTheDocument()
})

test('Item list is rendered', async () => {
    fetch.mockResponseOnce(JSON.stringify([item]));
    render(<App />)
    const itemDescriptionText = await screen.findByText(/Item 1/i)
    expect(itemDescriptionText).toBeInTheDocument()
})
