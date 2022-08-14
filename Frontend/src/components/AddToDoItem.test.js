import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import AddToDoItem from './AddToDoItem'

beforeEach(() => {
    fetch.resetMocks();
});

describe("Testing add to do items component", () => {
    test('The add button is rendered', async () => {
        render(<AddToDoItem />)
        const addButton = await screen.findByTestId('add-button');
        expect(addButton).toBeInTheDocument();
    });
    test('Adding items is successful', async () => {
        render(<AddToDoItem />)
        const textInput = await screen.findByTestId('description-text-input');
        const addButton = await screen.findByTestId('add-button');
        fetch.mockResponseOnce(JSON.stringify({}));
        await act(async () => {
            userEvent.type(textInput, "Kill self");
        });
        await act(async () => {
            userEvent.click(addButton);
        });
        expect(fetch).toBeCalled();
    });
});
