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
import { Check, LoaderCircle, Plus } from "lucide-react";
import { Textarea } from "@/common/components/ui/textarea";
import DateTimePicker24h from "@/common/components/DateTimePicker24h";

import { cn, generateErrorMessage } from "@/common/lib/utils";
import useCreateProjectMutation from "@/common/mutations/createProjectMutation";
import { toast } from "sonner";
import SelectTeam from "@/common/components/SelectTeam";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { Command, CommandList } from "cmdk";
import { CommandEmpty, CommandItem } from "@/common/components/ui/command";
import CurrencyInput from "@/common/components/CurrencyInput";

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
const options = [
  { value: "STANDART (1:1)" },
  { value: "STANDART (16:9)" },
  { value: "GIFs (1:1)" },
  { value: "PFP (Profile Picture) (1:1)" },
  { value: "BANNER (3:1)" },
];

const AddProjectDialog = () => {
  const [openRatioDropdown, setOpenRatioDropdown] = useState(false);
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useCreateProjectMutation({});
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
      // form.reset();
      // setOpen(false);
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
                      <CurrencyInput
                        placeholder="200,000"
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
                      <Popover
                        open={openRatioDropdown}
                        onOpenChange={setOpenRatioDropdown}
                      >
                        <PopoverTrigger asChild>
                          <div>
                            <Input
                              placeholder="1:1"
                              autoCorrect="off"
                              autoFocus={false}
                              autoComplete="off"
                              {...field}
                            />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-[370px] p-0"
                          onOpenAutoFocus={(e) => e.preventDefault()}
                        >
                          <Command>
                            <CommandList>
                              <CommandEmpty>No option found.</CommandEmpty>
                              {options.map((option) => (
                                <CommandItem
                                  key={option.value}
                                  onSelect={() => {
                                    field.onChange(option.value);
                                    setOpenRatioDropdown(false);
                                  }}
                                  className="justify-between"
                                >
                                  {option.value}
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === option.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
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
              <Button type="submit" disabled={isPending}>
                {isPending && <LoaderCircle className="animate-spin" />}
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectDialog;
