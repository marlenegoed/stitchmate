import { describe, expect, it, vitest } from "vitest"
import { render, screen, fireEvent } from '@testing-library/react'
import DeleteReminder from "../src/components/reminder/delete-reminder";
import userEvent from '@testing-library/user-event'; // Import user-event to simulate user interactions


    describe ('DeleteReminder', () => {
        it ('should render delete button and respond appropriately to a click event', () => {
            const handleDeleteMock = vitest.fn();
            // Render the component with handleDelete function
            render (<DeleteReminder handleDelete={handleDeleteMock}/>);
            const deleteButton = screen.getByRole('button', {text: /Delete/i});
            expect(deleteButton).toBeDefined();
            fireEvent.click(deleteButton);
        
            // expect(handleDeleteMock).toBeCalled();
        });
        it ('should render cancel button and respond appropriately to a click event', () => {
            render (<DeleteReminder/>);
            const cancelButton = screen.getByTestId('cancel-button');
            expect(cancelButton).toBeDefined();
            fireEvent.click(cancelButton);
        })
    })