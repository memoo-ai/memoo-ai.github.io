import { Toaster } from 'react-hot-toast';

export default function Toast() {
  return (
    <Toaster
      position="top-right"
      containerClassName="my-toast"
      containerStyle={{
        top: '8rem',
        right: '3rem',
      }}
      toastOptions={{
        className: 'toast-inner-container',
        style: {
          background: '#35373F',
          color: '#A0A5AD',
        },
      }}
    />
  );
}
