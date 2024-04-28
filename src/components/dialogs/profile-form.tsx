"use client";

import { useForm, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormAddPointDialogType } from "@/utils/constants/interfaces";

interface Props {
  form: UseFormReturn<FormAddPointDialogType>;
  handleSubmit(values: any): void;
}

export function ProfileForm(props: Props) {
  return (
    <form
      onSubmit={props.form.handleSubmit(props.handleSubmit)}
      className="space-y-8"
    >
      <FormField
        control={props.form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Name of the point" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={props.form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input placeholder="Description of the point" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className={"flex flex-row justify-between"}>
        <FormField
          control={props.form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input placeholder={"0.00"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={props.form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input placeholder={"0.00"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
