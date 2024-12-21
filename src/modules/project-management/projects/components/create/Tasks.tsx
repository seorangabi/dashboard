import { Button } from "@/common/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Plus, Trash } from "lucide-react";

import { FC } from "react";
import { Textarea } from "@/common/components/ui/textarea";
import CurrencyInput from "@/common/components/CurrencyInput";
import { FormSchema } from "./index.schema";

const Tasks: FC<{
  form: UseFormReturn<FormSchema>;
}> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tasks",
  });

  return (
    <div>
      <div className="flex items-center mb-2">
        <div className="text-lg">Tasks</div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          // @ts-expect-error Is fine
          onClick={() => append({ fee: 0, note: "", imageCount: 1 })}
        >
          <Plus />
        </Button>
      </div>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-x-2 border p-4 rounded-lg">
            <div className="w-10 rounded">{index + 1}</div>

            <FormField
              control={form.control}
              name={`tasks.${index}.fee`}
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
              name={`tasks.${index}.note`}
              render={({ field }) => (
                <FormItem className="w-full">
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

            <FormField
              control={form.control}
              name={`tasks.${index}.file`}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Picture</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      placeholder="Picture"
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  remove(index);
                }}
              >
                <Trash />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
