import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

//Criando a interface para a context de criação das tools
interface CreateToolDialogContextProps {
  onOpenDialog: boolean;
  setOnOpenDialog: (value: boolean) => void;
}

//Criando o Context com tipos e valor default
const CreateToolDialogContext =
  createContext<CreateToolDialogContextProps | null>(null);

//Criando o provider do context de criação de tools
export function CreateToolDialogContextProvider({
  children,
}: PropsWithChildren) {
  const [onOpenDialog, setOnOpenDialog] = useState<boolean>(false);

  return (
    <CreateToolDialogContext
      value={{
        onOpenDialog,
        setOnOpenDialog,
      }}
    >
      {children}
    </CreateToolDialogContext>
  );
}

//Criando hook para utilização do context
export function useCreateToolDialog() {
  const context = useContext(CreateToolDialogContext);

  if (!context) {
    throw new Error(
      "useCreateToolDialog must be used within a <CreateToolDialogContextProvider />"
    );
  }

  return context;
}
