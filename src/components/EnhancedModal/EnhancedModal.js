import React from 'react';

const EnhancedModal = ({ modalOpen, selectedItem, handleCloseModal }) => {
    if (!modalOpen || !selectedItem) return null;

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            handleCloseModal();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
            onClick={handleOverlayClick}
        >
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
                <button
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 id="modal-title" className="text-2xl font-semibold mb-6 border-b pb-3 border-gray-300 text-center">Conscient Details</h2>
                <div className="space-y-4 mb-6">
                    {[
                        { label: 'ID', value: selectedItem.id },
                        { label: 'Child Name', value: selectedItem.childName },
                        { label: 'Guardian\'s Name', value: selectedItem.guardianName },
                        { label: 'Phone Number', value: selectedItem.phoneNumber },
                        { label: 'Date of Birth (DOB)', value: selectedItem.dob },
                    ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between items-center border-b border-gray-200 py-2">
                            <span className="font-medium text-gray-700">{label}:</span>
                            <span className="text-gray-900">{value}</span>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleCloseModal}
                    className="bg-blue-600 right-4 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default EnhancedModal;
