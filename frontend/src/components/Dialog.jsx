import { createContext, useContext, useState } from 'react';
import Separator from '@radui/ui/Separator';
import Heading from '@radui/ui/Heading';
import Button from '@radui/ui/Button';

const DialogContext = createContext();

const Dialog = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <DialogContext.Provider value={{ isOpen, open, close }}>
      {children}
    </DialogContext.Provider>
  );
};

const Trigger = ({ children }) => {
  const { open } = useContext(DialogContext);
  return (
    <div onClick={open} className="inline-block cursor-pointer">
      {children}
    </div>
  );
};

const Content = ({ title, children }) => {
  const { isOpen, close } = useContext(DialogContext);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg p-6 shadow-xl w-full max-w-md">
        <Heading as="h4">{title}</Heading>
        <Separator />
        <div>{children}</div>
        <div className="mt-4 text-right">
          <Button
            onClick={close}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

// Attach subcomponents
Dialog.Trigger = Trigger;
Dialog.Content = Content;

export default Dialog;
