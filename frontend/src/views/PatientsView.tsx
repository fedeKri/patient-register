import React from 'react';
import { Plus } from 'lucide-react';
import { PatientTable } from '../components/PatientTable';
import { PatientModal } from '../components/PatientModal';
import { AddPatientModal } from '../components/AddPatientModal';
import { getPatients, createPatient } from '../api/patients';
import { PaginatedResponse, Patient } from '../types/patient';
import { usePagination } from '../hooks/usePagination';
import { useAsync } from '../hooks/useAsync';
import { Button } from '../components/ui/Button';

export const PatientsView: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = React.useState<Patient | null>(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  
  const {
    currentPage,
    perPage,
    setCurrentPage,
    handlePerPageChange,
  } = usePagination();

  const {
    isLoading,
    error,
    execute: fetchPatients,
  } = useAsync({
    errorMessage: 'Failed to load patients',
  });

  const {
    execute: handleAddPatient,
  } = useAsync({
    successMessage: 'Patient added successfully',
    errorMessage: 'Failed to add patient',
    onSuccess: () => {
      setShowAddModal(false);
      fetchPatients(async () => {
        const data = await getPatients(currentPage, perPage);
        setPatients(data);
        return data;
      });
    },
  });

  const [patients, setPatients] = React.useState<PaginatedResponse<Patient> | null>(null);

  React.useEffect(() => {
    fetchPatients(async () => {
      const data = await getPatients(currentPage, perPage);
      setPatients(data);
      return data;
    });
  }, [currentPage, perPage, fetchPatients]);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0 mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Patients</h1>
        <Button
          onClick={() => setShowAddModal(true)}
          icon={<Plus className="h-5 w-5" />}
        >
          Add Patient
        </Button>
      </div>

      <PatientTable
        patients={patients}
        isLoading={isLoading}
        error={error}
        onPageChange={setCurrentPage}
        onPerPageChange={handlePerPageChange}
        onPatientClick={setSelectedPatient}
      />

      {selectedPatient && (
        <PatientModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}

      {showAddModal && (
        <AddPatientModal
          onClose={() => setShowAddModal(false)}
          onSubmit={(formData) => handleAddPatient(() => createPatient(formData))}
        />
      )}
    </div>
  );
};