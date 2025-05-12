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
    <div className="fixed inset-0  bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1b1b2f]/80 rounded-lg overflow-hidden shadow-2xl w-full max-w-md transform transition-all">
      
        <div className=" p-4">
          <Heading as="h4" className="text-white">{title}</Heading>
        </div>
        <Separator className="opacity-30" />
        <div className="p-6">{children}</div>
        <div className="px-6 pb-6 text-right">
          <Button
            onClick={close}
            className="px-5 py-2 bg-gradient-primary text-white rounded-md hover:opacity-90 transition-opacity shadow-md"
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
