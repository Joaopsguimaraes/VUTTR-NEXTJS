/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { onSubmitAction } from "@/actions/create-tool-action";

import { useActionState, useEffect } from "react";
import {
  createToolSchema,
  type CreateToolSchemaType,
} from "@/validations/create-tool-schema";
import { Skeleton } from "./ui/skeleton";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "./ui/label";

import { useCreateToolDialog } from "@/context/create-tool-context";
import { useTranslations } from "next-intl";

export function CreateToolForm() {
  const [result, handleCreateTool, isPending] = useActionState(onSubmitAction, {
    error: false,
    message: "",
  });
  const form = useForm<CreateToolSchemaType>({
    resolver: zodResolver(createToolSchema),
  });
  const t = useTranslations("CreateTools");
  const { toast } = useToast();
  const { setOnOpenDialog } = useCreateToolDialog();
  const { register } = form;

  useEffect(() => {
    if (result.error) {
      if (Array.isArray(result.message)) {
        result.message.forEach((error) => {
          toast({
            title: t(`validations.${error.path.trim().toLowerCase()}`),
            description: error.message,
            variant: "destructive",
          });
        });
      } else {
        toast({
          title: result.message,
          variant: "destructive",
        });
      }
    }

    if (result.message === "SUCCESS") {
      setOnOpenDialog(false);
      toast({
        title: t("successCreateTool"),
        variant: "success",
      });
    }
  }, [result, setOnOpenDialog]);

  return (
    <form action={handleCreateTool} className="flex flex-col gap-5">
      {isPending ? (
        Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} className="h-10" />
        ))
      ) : (
        <>
          <div className="space-y-2">
            <Label>{t("labelName")}</Label>
            <Input
              placeholder={t("namePlaceholder")}
              {...form.register("name")}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("labelUrl")}</Label>
            <Input placeholder={t("urlPlaceholder")} {...register("url")} />
          </div>

          <div className="space-y-2">
            <Label>{t("labelDescription")}</Label>
            <Textarea
              placeholder={t("descriptionPlaceholder")}
              rows={10}
              {...register("description")}
            />
          </div>
          <div className="space-y-2">
            <Label>{t("labelTags")}</Label>
            <Input placeholder={t("tagsPlaceholder")} {...register("tags")} />
          </div>
        </>
      )}

      <DialogFooter className="w-full flex justify-end gap-2">
        <Button type="button" variant="outline">
          {t("btnCancel")}
        </Button>
        <Button disabled={isPending} className="min-w-32">
          {isPending ? (
            <Loader className="animate-spin" />
          ) : (
            <span>{t("btnCreate")}</span>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
