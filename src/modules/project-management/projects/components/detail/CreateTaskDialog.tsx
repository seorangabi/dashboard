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
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Plus } from "lucide-react";
import { Textarea } from "@/common/components/ui/textarea";

import { generateErrorMessage } from "@/common/lib/utils";
import { toast } from "sonner";
import useCreateTaskMutation from "@/common/mutations/createTaskMutation";
import CurrencyInput from "@/common/components/CurrencyInput";

const formSchema = z.object({
  fee: z.number(),
  note: z.string(),
});

const CreateTaskDialog: FC<{
  projectId: string;
  onSuccess?: () => void;
}> = ({ projectId, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useCreateTaskMutation({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutateAsync({
        projectId,
        fee: values.fee,
        note: values.note,
        imageCount: 1,
      });

      toast.success("Task created successfully");
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
            note: "",
          });

        setOpen(newOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <DialogHeader>
              <DialogTitle>Create Task</DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              <FormField
                control={form.control}
                name="fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fee*</FormLabel>
                    <FormControl>
                      <CurrencyInput
                        placeholder="200.000"
                        {...field}
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                      />
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
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
