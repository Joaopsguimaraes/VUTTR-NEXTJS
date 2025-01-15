"use client";

import { CreateToolDialogContextProvider } from "@/context/create-tool-context";

import { CreateToolDialog } from "./create-tool-dialog";

export function CreateTool() {
  return (
    <CreateToolDialogContextProvider>
      <CreateToolDialog />
    </CreateToolDialogContextProvider>
  );
}
