import { create } from 'zustand';

interface FormStore {
  formData: {
    businessName?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    businessType?: 'INDIVIDUAL' | 'ORGANIZATION'
  };
  setFormData: (data: Partial<FormStore['formData']>) => void;

  vendorData: {
    id: string;
    businessName: string;
    businessType?: 'INDIVIDUAL' | 'ORGANIZATION'
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: null | string;
  }

  setVendorData: (data: Partial<FormStore['vendorData']>) => void;
}


export const registerStore = create<FormStore>((set) => ({
  formData:{
    businessName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    businessType: 'INDIVIDUAL',
  },
  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  vendorData: {
    id: "",
    businessName: "",
    businessType: 'INDIVIDUAL',
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address:""
  },
  setVendorData: (data) => set((state) => ({ vendorData: { ...state.vendorData, ...data } })),
}))