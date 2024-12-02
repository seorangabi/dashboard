import React, { useMemo } from "react";
import CreatePayrollBreadcrumb from "./Breadcrumb";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { generateErrorMessage } from "@/common/lib/utils";
import { Button } from "@/common/components/ui/button";
import SelectTeam from "@/common/components/SelectTeam";
import useCreatePayrollMutation from "@/common/mutations/createPayrollMutation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";
import DatePickerSingle from "@/common/components/DatePickerSingle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";
import { Label } from "@/common/components/ui/label";
import Link from "next/link";
import useProjectListQuery from "@/common/queries/projectListQuery";
import { startOfDay } from "date-fns";
import { useRouter } from "next/router";

const formSchema = z.object({
  teamId: z.string(),
  status: z.enum(["DRAFT", "PAID"]),
  periodStart: z.date(),
  periodEnd: z.date(),
  projects: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      fee: z.number(),
    })
  ),
});

const CreatePayroll = () => {
  const router = useRouter();
  const { mutateAsync } = useCreatePayrollMutation({});
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "DRAFT",
      projects: [],
    },
  });

  const teamId = form.watch("teamId");
  const selectedProjects = form.watch("projects");

  const { data: projectData } = useProjectListQuery({
    query: {
      team_id_eq: teamId,
      status_eq: "DONE",
      is_paid_eq: false,
    },
    options: {
      enabled: !!teamId,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutateAsync({
        periodStart: startOfDay(values.periodStart).toISOString(),
        periodEnd: startOfDay(values.periodEnd).toISOString(),
        projectIds: values.projects.map((project) => project.id) ?? [],
        status: values.status,
        teamId: values.teamId,
      });

      toast.success("Payroll created successfully");
      form.reset();

      router.push("/admin/project-management/payroll/create");
    } catch (error) {
      console.error(error);
      toast.error(generateErrorMessage(error));
    }
  };

  const projectsNeedToBePaid = useMemo(() => {
    if (!projectData?.data?.docs) return [];
    return projectData?.data?.docs.map((project) => ({
      id: project.id,
      name: project.name,
      fee: project.fee,
    }));
  }, [projectData]);

  const filteredProjectNeedToBePaid = useMemo(() => {
    if (!selectedProjects?.length) return projectsNeedToBePaid;
    return projectsNeedToBePaid.filter(
      (project) =>
        !selectedProjects.some(
          (selectedProject) => selectedProject.id === project.id
        )
    );
  }, [projectsNeedToBePaid, selectedProjects]);

  return (
    <div>
      <CreatePayrollBreadcrumb />

      <div className="flex justify-between items-center mt-6 mb-5">
        <h1 className="text-2xl font-medium">Create Payroll</h1>
        <div className="space-x-2"></div>
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <FormField
                control={form.control}
                name="teamId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team</FormLabel>
                    <FormControl>
                      <SelectTeam
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          form.setValue("projects", []);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payroll Status</FormLabel>
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
                        <SelectItem value="DRAFT">Draft</SelectItem>
                        <SelectItem value="PAID">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="periodStart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Period Start</FormLabel>
                    <FormControl>
                      <DatePickerSingle
                        date={field.value}
                        setDate={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="periodEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Period End</FormLabel>
                    <FormControl>
                      <DatePickerSingle
                        date={field.value}
                        setDate={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <Label>Projects Need To Be Paid</Label>
                <div className="border rounded">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project Name</TableHead>
                        <TableHead className="text-right">Fee</TableHead>
                        <TableHead className="text-center w-[200px]">
                          #
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProjectNeedToBePaid?.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>{project.name}</TableCell>
                          <TableCell className="text-right">
                            {project.fee}
                          </TableCell>
                          <TableCell className="text-center flex justify-center">
                            <Link
                              href={{
                                pathname: `/admin/project-management/projects/[projectId]`,
                                query: { projectId: project.id },
                              }}
                              target="_blank"
                            >
                              <Button type="button" variant="link">
                                Detail
                              </Button>
                            </Link>
                            <Button
                              type="button"
                              variant="link"
                              onClick={() => {
                                form.setValue("projects", [
                                  ...selectedProjects,
                                  project,
                                ]);
                              }}
                            >
                              Add
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredProjectNeedToBePaid?.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center">
                            No projects
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">
                          {filteredProjectNeedToBePaid?.reduce(
                            (total, project) => total + project.fee,
                            0
                          ) || 0}
                        </TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </div>

              <FormField
                control={form.control}
                name="projects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Projects that will be paid
                    </FormLabel>

                    <FormControl>
                      <div className="border rounded">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Project Name</TableHead>
                              <TableHead className="text-right">Fee</TableHead>
                              <TableHead className="text-center w-[200px]">
                                #
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {field.value?.map((project) => (
                              <TableRow key={project.id}>
                                <TableCell>{project.name}</TableCell>
                                <TableCell className="text-right">
                                  {project.fee}
                                </TableCell>
                                <TableCell className="text-center flex justify-center">
                                  <Link
                                    href={{
                                      pathname: `/admin/project-management/projects/[projectId]`,
                                      query: { projectId: project.id },
                                    }}
                                    target="_blank"
                                  >
                                    <Button type="button" variant="link">
                                      Detail
                                    </Button>
                                  </Link>
                                  <Button
                                    type="button"
                                    variant="link"
                                    onClick={() =>
                                      field.onChange(
                                        field.value?.filter(
                                          (p) => p.id !== project.id
                                        )
                                      )
                                    }
                                  >
                                    Remove
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                            {field.value?.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                  No projects selected
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TableHead>Total</TableHead>
                              <TableHead className="text-right">
                                {field.value?.reduce(
                                  (total, project) => total + project.fee,
                                  0
                                ) || 0}
                              </TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableFooter>
                        </Table>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="mt-6">
              Create Payroll
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePayroll;
