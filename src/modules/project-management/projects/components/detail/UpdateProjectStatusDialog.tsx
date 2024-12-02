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
import { Pencil } from "lucide-react";

import { generateErrorMessage } from "@/common/lib/utils";
import { toast } from "sonner";
import useUpdateProjectMutation from "@/common/mutations/updateProjectMutation";
import { Project } from "@/common/types/project";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";
import { PROJECT_STATUS } from "@/modules/project-management/payroll/constants";

const formSchema = z.object({
  status: z.enum(["OFFERING", "IN_PROGRESS", "REVISION", "DONE"]),
});

const UpdateProjectStatusDialog: FC<{ project: Project | undefined }> = ({
  project,
}) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useUpdateProjectMutation({});
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: project?.status,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!project) throw new Error("Project not found");

      await mutateAsync({
        id: project?.id || "",
        ...values,
      });

      toast.success("Project status updated successfully");
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(generateErrorMessage(error));
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open) {
          form.reset({
            status: project?.status,
          });
        }

        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="link" size="sm" disabled={project?.status === "DONE"}>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <DialogHeader>
              <DialogTitle>Update Status</DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="OFFERING">
                          {PROJECT_STATUS.OFFERING}
                        </SelectItem>
                        <SelectItem value="IN_PROGRESS">
                          {PROJECT_STATUS.IN_PROGRESS}
                        </SelectItem>
                        <SelectItem value="REVISION">
                          {PROJECT_STATUS.REVISION}
                        </SelectItem>
                        <SelectItem value="DONE">
                          {PROJECT_STATUS.DONE}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProjectStatusDialog;
