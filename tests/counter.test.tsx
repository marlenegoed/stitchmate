import { describe, expect, it, vitest } from "vitest"
import { render, screen, fireEvent } from '@testing-library/react'
import Counter from "../src/components/counter/counter"

    describe('Counter', () => {
        it('should increase count by 1 when clicked', () => { 
            const mockStore = { 
                count: 1,
                countUp: vitest.fn(),
                clickSoundEnabled: false
             };
    
             render(<Counter />, {useStore: mockStore});

            // check for an element with text '1' -> the counter always starts at 1 (=first row)
            let countElement = screen.getByText('1');
            expect(countElement).toBeDefined();
             
            // Get the counter button element (there is only one button in the component)
            const counterButton = screen.getByRole('button');
             
            // Fire a click event on the counter button
            fireEvent.click(counterButton);
             
            // Check if countUp function was called
            //  expect(mockStore.countUp).toHaveBeenCalled();
             
            // Check if an element with text '2' gets rendered on screen
            countElement = screen.getByText('2');
            expect(countElement).toBeDefined();
         });
    });