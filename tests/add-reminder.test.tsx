import { describe, expect, it, vi } from "vitest"
import { render, screen } from '@testing-library/react'
import ReminderForm from "@/components/reminder/reminder-form"
import user from "@testing-library/user-event"


describe('add reminder', () => { 
    it('should add a reminder', async () => { 

    const mockHandleFormSubmit = () => {};
    
    const reminder = { 
                type: 'every', 
                title: 'my reminder', 
                note: 'stitch', 
                repeat: {
                    interval: '2',
                    times: '1',
                    start: '2' 
                    }
            };  

         const props = {
            handleFormSubmit: vi.fn(mockHandleFormSubmit), 
            reminder: reminder
            };

         render(<ReminderForm {...props} />);
            
         const startRowInput = screen.getByLabelText('start row')
         expect(startRowInput).toBeDefined()

         await user.clear(startRowInput);
         await user.type(startRowInput, '18');

         const submitButton = screen.getByRole('button', { name: /save changes/i });
         await user.click(submitButton);

         expect(props.handleFormSubmit).toHaveBeenCalledTimes(1)
         expect(props.handleFormSubmit).toHaveBeenCalledWith(expect.objectContaining({
            ...reminder,
            repeat: { ...reminder.repeat, start: 18 }
        }));
    });
    })