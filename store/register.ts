import { atom } from 'jotai';

// Define the atom for registration info
const RegisterInfoAtom = atom({
  name: '',
  email: '',
  password: '',
});

export default RegisterInfoAtom;
