import React from 'react';
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddPatientModal } from '../AddPatientModal';


function createFile(name: string, type: string) {
  return new File(['(⌐□_□)'], name, { type });
}

describe('AddPatientModal', () => {
  it('submits correct form data when Save Patient is clicked', async () => {

    type OnSubmit = (formData: FormData) => Promise<void>;

    
    const onSubmitMock = jest.fn() as jest.MockedFunction<OnSubmit>;
    onSubmitMock.mockResolvedValue(undefined);

    const onCloseMock = jest.fn();

    
    render(<AddPatientModal onClose={onCloseMock} onSubmit={onSubmitMock} />);

    
    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');

    await userEvent.type(screen.getByLabelText(/email/i), 'john@gmail.com');

 
    await userEvent.click(screen.getByText('Select code...'));
    await userEvent.click(screen.getByText('+1'));

    await userEvent.type(screen.getByLabelText(/phone number/i), '12345678');

  
    const jpgFile = createFile('document.jpg', 'image/jpeg');

    const dropZoneInput = screen.getByLabelText(/document photo/i, {
      selector: 'input[type="file"]',
    });
    await userEvent.upload(dropZoneInput, jpgFile);

    
    await userEvent.click(screen.getByText(/save patient/i));

    
    expect(onSubmitMock).toHaveBeenCalledTimes(1);

    
    const formDataArg = onSubmitMock.mock.calls[0][0] as FormData;

    
    expect(formDataArg.get('fullName')).toBe('John Doe');
    expect(formDataArg.get('email')).toBe('john@gmail.com');
    expect(formDataArg.get('phoneCountryCode')).toBe('+1');
    expect(formDataArg.get('phoneNumber')).toBe('12345678');

    
    const docFile = formDataArg.get('documentPhoto') as File;
    expect(docFile).toBeInstanceOf(File);
    expect(docFile.name).toBe('document.jpg');
  });
});
