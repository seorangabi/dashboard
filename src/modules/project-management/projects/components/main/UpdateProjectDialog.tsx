import { Button } from "@/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Pencil } from "lucide-react";
import { Textarea } from "@/common/components/ui/textarea";
import DateTimePicker24h from "@/common/components/DateTimePicker24h";

import { generateErrorMessage } from "@/common/lib/utils";
import { toast } from "sonner";
import useUpdateProjectMutation from "@/common/mutations/updateProjectMutation";
import { Project } from "@/common/types/project";

const formSchema = z.object({
  name: z.string(),
  fee: z.number(),
  deadline: z.date(),
  imageRatio: z.string(),
  note: z.string().optional(),
});

const UpdateProjectDialog: FC<{
  project: Project | undefined;
  onSuccess?: () => void;
}> = ({ project, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useUpdateProjectMutation({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutateAsync({
        id: project?.id || "",
        ...values,
        deadline: values.deadline.toISOString(),
      });

      toast.success("Project updated successfully");
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error(generateErrorMessage(error));
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (newOpen)
          form.reset({
            name: project?.name || "",
            fee: project?.fee || 0,
            imageRatio: project?.imageRatio || "",
            note: project?.note || "",
            deadline: new Date(),
          });

        setOpen(newOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          disabled={project?.status !== "OFFERING"}
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <DialogHeader>
              <DialogTitle>Update Project</DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fee*</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="200.000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline*</FormLabel>
                    <FormControl>
                      <DateTimePicker24h
                        date={field.value ? new Date(field.value) : undefined}
                        setDate={(date) => field.onChange(date?.toISOString())}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageRatio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image Ratio*</FormLabel>
                    <FormControl>
                      <Input placeholder="1:1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Note"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending && <LoaderCircle className="animate-spin" />}
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProjectDialog;
