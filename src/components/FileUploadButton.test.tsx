import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileUploadButton from './FileUploadButton';

describe('FileUploadButton', () => {
  it('displays error dialogue when invalid file is selected', () => {
    render(<FileUploadButton />);

    const fileInput = screen.getByLabelText('Upload File');

    // Create a dummy file with an invalid extension (PDF)
    const file = new File(['dummy content'], 'dummy.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Check that the error message is displayed
    const errorMessage = screen.getByText('Please upload a CSV file.');
    expect(errorMessage).toBeInTheDocument();
  });
});
