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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Textarea } from "@/common/components/ui/textarea";
import DateTimePicker24h from "@/common/components/DateTimePicker24h";

import { generateErrorMessage } from "@/common/lib/utils";
import useCreateProjectMutation from "@/common/mutations/createProjectMutation";
import { toast } from "sonner";
import SelectTeam from "@/common/components/SelectTeam";

const formSchema = z.object({
  name: z.string(),
  fee: z.number(),
  imageCount: z.number(),
  deadline: z.date(),
  imageRatio: z.string(),
  note: z.string().optional(),
  teamId: z.string(),
  clientName: z.string(),
});

const AddProjectDialog = () => {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useCreateProjectMutation({});
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deadline: new Date(),
      imageCount: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutateAsync({
        ...values,
        deadline: values.deadline.toISOString(),
      });

      toast.success("Project created successfully");
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(generateErrorMessage(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <DialogHeader>
              <DialogTitle>Add Project</DialogTitle>
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
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client*</FormLabel>
                    <FormControl>
                      <Input placeholder="Client name" {...field} />
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
                      <Input
                        type="number"
                        placeholder="200000"
                        {...field}
                        onChange={(event) =>
                          field.onChange(
                            event.target.value
                              ? Number(event.target.value)
                              : null
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image*</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                        onChange={(event) =>
                          field.onChange(
                            event.target.value
                              ? Number(event.target.value)
                              : null
                          )
                        }
                      />
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
                        date={field.value}
                        setDate={(date) => field.onChange(date)}
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
                name="teamId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team*</FormLabel>
                    <FormControl>
                      <SelectTeam
                        value={field.value}
                        onChange={field.onChange}
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
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectDialog;
