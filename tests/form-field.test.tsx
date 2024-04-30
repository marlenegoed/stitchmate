import { describe, expect, it, test, vitest } from "vitest"
import { render, screen } from '@testing-library/react'
import { Button } from "../src/components/ui/button"
import ReminderForm from "../src/components/reminder/reminder-form"
import Input from "../src/components/ui/input"


describe('<Button />', () => { 
    it(`should render button with text 'save changes'`, () => { 
        render(<Button type="submit">Save changes</Button>)
        expect(screen.getByRole('button', {name:'Save changes'}))
     })
 })

describe('UI Elements', () => {
    it('should render the ReminderForm with Title', () => { 
        // create Props as MockData
        const props = {
            className: 'test-class',
            handleFormSubmit: vitest.fn(),
            reminder: { type: 'every', title: 'my reminder', note: 'stitch', repeat: 15 },
            setReminderType: vitest.fn()
            };

        render(<ReminderForm {...props} />);
        expect(screen.getByLabelText('Title')).toBeDefined()
     })

    it('should render Input component with the "inline" style.', () => { 
        const props = {
            variant: 'inline',
        }
        render(<Input {...props}/>);
        const input = screen.getByLabelText('times');
        expect(input).toBeDefined()
        // check for the correct style:
        expect(input.classList).toContain('bg-inherit')
        expect(input.classList).toContain('border-none')
        expect(input.classList).toContain('focus:outline-none')
      })
    })

