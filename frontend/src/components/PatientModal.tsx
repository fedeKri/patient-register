import React from 'react';
import { Modal } from './ui/Modal';
import { Patient } from '../types/patient';

interface PatientModalProps {
  patient: Patient;
  onClose: () => void;
}

export const PatientModal: React.FC<PatientModalProps> = ({ patient, onClose }) => {
  return (

    <Modal title="Patient Details" onClose={onClose} size="md">
      <div className="space-y-8">
        <div className="border-b border-gray-900/10 pb-8">

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-md shadow-sm">
              <div className="text-lg font-semibold text-gray-700 mb-1">
                Full Name
              </div>
              <div className="text-base text-gray-900 break-all">
                {patient.fullName}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-md shadow-sm">
              <div className="text-lg font-semibold text-gray-700 mb-1">
                Email
              </div>
              <div className="text-base text-gray-900 break-all">
                {patient.email}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-md shadow-sm">
              <div className="text-lg font-semibold text-gray-700 mb-1">
                Phone
              </div>
              <div className="text-base text-gray-900 break-all">
                {patient.phoneCountryCode} {patient.phoneNumber}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-md shadow-sm">
              <div className="text-lg font-semibold text-gray-700 mb-1">
                Created At
              </div>
              <div className="text-base text-gray-900 break-all">
                {new Date(patient.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-8">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Document Photo
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            The uploaded image of the patient's document
          </p>

          <div className="mt-6 p-4 bg-gray-50 rounded-md shadow-sm max-w-sm mx-auto">
            <img
              src={patient.documentPhotoUrl}
              alt="Patient Document"
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
