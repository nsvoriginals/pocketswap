import { atom } from 'jotai';

const UserInfoAtom = atom({
  id: null,
  name: '',
  email: '',
  balance: 0,
});

export default UserInfoAtom;
