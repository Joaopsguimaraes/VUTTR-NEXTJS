import { useCreateToolDialog } from "@/context/create-tool-context";
import { CreateToolForm } from "./create-tool-form";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export function CreateToolDialog() {
  const { onOpenDialog, setOnOpenDialog } = useCreateToolDialog();

  return (
    <Dialog open={onOpenDialog} onOpenChange={setOnOpenDialog}>
      <DialogTrigger asChild>
        <Button className="self-end w-40">Cadastre</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cadastre a tool</DialogTitle>
        </DialogHeader>
        <CreateToolForm />
      </DialogContent>
    </Dialog>
  );
}
