import React, { useState, useRef } from 'react';
import './FileUploadButton.css'

const FileUploadButton: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validFileTypes = ['text/csv', 'application/vnd.ms-excel'];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const fileType = file.type;
      if (validFileTypes.includes(fileType)) {
        // Valid file type, show upload modal
        setErrorMessage(null);
        setShowUploadModal(true);
      } else {
        // Invalid file type, show error message and reset input
        setErrorMessage('Please upload a CSV file.');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        // Replace with your API endpoint URL
        const apiUrl = 'https://api.example.com/upload';
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          setUploadedFileName(file.name);
          setShowUploadModal(false);
        } else {
          setErrorMessage('Error occurred during file upload. Please try again.');
        }
      } catch (error) {
        console.error('File upload error:', error);
        setErrorMessage('Error occurred during file upload. Please try again.');
      }
    }
  };


  const handleCloseModal = () => {
    setErrorMessage(null);
    setShowUploadModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="file_upload_wrapper">
      <input type="file" onChange={handleFileChange} ref={fileInputRef} />
      {errorMessage && !showUploadModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Error</h5>
              </div>
              <div className="modal-body">
                <p>{errorMessage}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleCloseModal}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showUploadModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload</h5>
              </div>
              <div className="modal-body">
                <p>
                  Click "Upload" to proceed with the upload of the chosen file: {uploadedFileName}
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleUpload}>
                  Upload
                </button>
                <button className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadButton;
