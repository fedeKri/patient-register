import React from 'react';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { Patient, PaginatedResponse } from '../types/patient';

interface PatientTableProps {
  patients: PaginatedResponse<Patient> | null;
  isLoading: boolean;
  error: string | null;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  onPatientClick: (patient: Patient) => void;
}

export const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  isLoading,
  error,
  onPageChange,
  onPerPageChange,
  onPatientClick,
}) => {
  const perPageOptions = [10, 25, 50, 100];

  
  const renderTableContent = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={4} className="py-16">
            <div className="flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={4} className="py-16">
            <div className="flex flex-col items-center justify-center text-gray-500">
              <AlertCircle className="w-12 h-12 text-red-500 mb-2" />
              <p className="text-lg font-medium text-red-600">Something went wrong</p>
              <p className="text-sm">{error}</p>
            </div>
          </td>
        </tr>
      );
    }

    if (!patients || !patients.data.length) {
      return (
        <tr>
          <td colSpan={4} className="py-16">
            <div className="flex flex-col items-center justify-center text-gray-500">
              <p className="text-lg font-medium">No patients found</p>
              <p className="text-sm">Add a new patient to get started</p>
            </div>
          </td>
        </tr>
      );
    }

    
    return patients.data.map((patient) => (
      <tr
        key={patient.id}
        
        onClick={() => onPatientClick(patient)}
        className="hover:bg-gray-50 cursor-pointer"
      >
        
        <td className="py-4 pl-4 pr-3 text-sm">
          <img
            src={patient.documentPhotoUrl}
            alt={`${patient.fullName}'s document`}
            className="h-12 w-12 rounded-full object-cover"
          />
        </td>

       
        <td className="px-3 py-4 text-sm text-gray-900 font-medium">
          {patient.fullName}
        </td>

        
        <td className="px-3 py-4 text-sm text-gray-500">
          {new Date(patient.createdAt).toLocaleDateString()}
        </td>

        
        <td className="py-4 pl-3 pr-4 text-right">
          <button
            type="button"
            className="text-blue-600 hover:text-blue-900"
          >
            View details
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
              Photo
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Complete Name
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Created At
            </th>
            <th className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {renderTableContent()}
        </tbody>
      </table>

     
      {patients && patients.data.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3">
          
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-2">Show</span>
            <select
              value={patients.meta.perPage}
              onChange={(e) => onPerPageChange(Number(e.target.value))}
              className="rounded-md border-gray-300 py-1 text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {perPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-700 ml-2">entries</span>
          </div>

          
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => onPageChange(patients.meta.currentPage - 1)}
              disabled={patients.meta.currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(patients.meta.currentPage + 1)}
              disabled={patients.meta.currentPage === patients.meta.lastPage}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>

         
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{patients.meta.from}</span> to{' '}
                <span className="font-medium">{patients.meta.to}</span> of{' '}
                <span className="font-medium">{patients.meta.total}</span> results
              </p>
            </div>
            <div className="ml-4">
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => onPageChange(patients.meta.currentPage - 1)}
                  disabled={patients.meta.currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => onPageChange(patients.meta.currentPage + 1)}
                  disabled={patients.meta.currentPage === patients.meta.lastPage}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
