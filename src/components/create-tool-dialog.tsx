import { useCreateToolDialog } from "@/context/create-tool-context";
import { CreateToolForm } from "./create-tool-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useTranslations } from "next-intl";

export function CreateToolDialog() {
  const { onOpenDialog, setOnOpenDialog } = useCreateToolDialog();
  const t = useTranslations("CreateTools");

  return (
    <Dialog open={onOpenDialog} onOpenChange={setOnOpenDialog}>
      <DialogTrigger asChild>
        <Button className="self-end w-40">{t("btnCreate")}</Button>
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
