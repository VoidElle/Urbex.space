"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { ProfileForm } from "@/components/dialogs/profile-form";
import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { FormAddPointDialogType } from "@/utils/constants/interfaces";

interface Props {
  isShowing: boolean;
  onHide: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be longer",
  }),
  description: z.string(),
  latitude: z.string().min(3, {
    message: "Latitude is not valid",
  }),
  longitude: z.string().min(3, {
    message: "Longitude is not valid",
  }),
});

export default function AddPointDialog(props: Props) {
  const form: UseFormReturn<FormAddPointDialogType> = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      latitude: "",
      longitude: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <AlertDialog open={props.isShowing} onOpenChange={props.onHide}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={"flex justify-center"}>
            Add a point
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Form {...form}>
              <ProfileForm form={form} handleSubmit={onSubmit} />
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction type={"submit"}>Add</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
