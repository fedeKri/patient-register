/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Loader2 } from 'lucide-react';
import { z } from 'zod';
import clsx from 'clsx';
import Select from 'react-select';
import { phoneCodeOptions } from '../resources/commons/phoneCodes';


const patientSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .regex(/^[a-zA-Z\s]*$/, 'Only letters are allowed'),
  email: z
    .string()
    .email('Must be a valid email')
    .regex(/@gmail\.com$/, 'Only @gmail.com addresses are allowed'),
  phoneCountryCode: z.string().min(1, 'Country code is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
});

interface AddPatientModalProps {
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
}



export const AddPatientModal: React.FC<AddPatientModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneCountryCode: '',
    phoneNumber: '',
  });
  const [documentPhoto, setDocumentPhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'image/jpeg') {
      setDocumentPhoto(file);
      setErrors((prev) => ({ ...prev, documentPhoto: '' }));
    } else {
      setErrors((prev) => ({
        ...prev,
        documentPhoto: 'Only JPG files are allowed',
      }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpg', '.jpeg'] },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      patientSchema.parse(formData);

      if (!documentPhoto) {
        setErrors({ documentPhoto: 'Document photo is required' });
        return;
      }

      const submitFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitFormData.append(key, value);
      });
      submitFormData.append('documentPhoto', documentPhoto);

      setIsSubmitting(true);
      await onSubmit(submitFormData);
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  const labelClass = 'block text-sm font-medium text-gray-900';
  const inputClass = clsx(
    'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400',
    'focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600',
  );

  const customSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      borderRadius: '0.375rem',
      borderColor: state.isFocused
        ? '#6366f1'
        : errors.phoneCountryCode
        ? '#fca5a5'
        : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(99,102,241,0.2)' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#6366f1' : '#9ca3af',
      },
      minHeight: '2.5rem',
      fontSize: '1rem',
      backgroundColor: '#fff',
    }),
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
    placeholder: (base: any) => ({
      ...base,
      color: '#9ca3af',
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#374151',
    }),
    option: (base: any, state: any) => ({
      ...base,
      fontSize: '1rem',
      backgroundColor: state.isFocused ? '#f3f4f6' : '#fff',
      color: '#374151',
    }),
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-xl w-full p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          disabled={isSubmitting}
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-base font-semibold text-gray-900">
          Add New Patient
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Use a permanent address where you can receive mail.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-y-8">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Full Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className={clsx(
                  inputClass,
                  errors.fullName && 'outline-red-300 focus:outline-red-500'
                )}
                placeholder="John Doe"
                disabled={isSubmitting}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600 animate-shake">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={clsx(
                  inputClass,
                  errors.email && 'outline-red-300 focus:outline-red-500'
                )}
                placeholder="example@gmail.com"
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 animate-shake">
                {errors.email}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <div>
              <label htmlFor="phoneCountryCode" className={labelClass}>
                Country Code
              </label>
              <div className="mt-2">
                <Select
                  inputId="phoneCountryCode"
                  options={phoneCodeOptions}
                  value={
                    phoneCodeOptions.find(
                      (opt) => opt.value === formData.phoneCountryCode
                    ) || null
                  }
                  onChange={(option) => {
                    setFormData({
                      ...formData,
                      phoneCountryCode: option?.value || '',
                    });
                  }}
                  isDisabled={isSubmitting}
                  placeholder="Select code..."
                  styles={customSelectStyles}
                  menuPortalTarget={document.body}
                  className="text-base"
                />
              </div>
              {errors.phoneCountryCode && (
                <p className="mt-1 text-sm text-red-600 animate-shake">
                  {errors.phoneCountryCode}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className={labelClass}>
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className={clsx(
                    inputClass,
                    errors.phoneNumber && 'outline-red-300 focus:outline-red-500'
                  )}
                  placeholder="12345678"
                  disabled={isSubmitting}
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600 animate-shake">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="documentPhoto" className={clsx(labelClass, 'mb-2')}>Document Photo</label>
            <div
              {...getRootProps()}
              className={clsx(
                'mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
                isDragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400',
                errors.documentPhoto && 'border-red-300'
              )}
            >
              <input id="documentPhoto" {...getInputProps()} disabled={isSubmitting} />
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              {documentPhoto ? (
                <p className="mt-2 text-sm text-gray-600">{documentPhoto.name}</p>
              ) : (
                <p className="mt-2 text-sm text-gray-600">
                  Drag & drop a JPG file here, or click to select
                </p>
              )}
            </div>
            {errors.documentPhoto && (
              <p className="mt-1 text-sm text-red-600 animate-shake">
                {errors.documentPhoto}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm 
                hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Saving...
                </>
              ) : (
                'Save Patient'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
