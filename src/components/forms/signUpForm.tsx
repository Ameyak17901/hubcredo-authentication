import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "./schema";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { signUp } = useAuth();

  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof signUpSchema>) => {
      const { email, password, name } = data;

      const { error } = await signUp(email, password, name);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Signed up successfully!");
    }
  );

  return (
    <div className="m-1">
      <form onSubmit={onSubmit}>
        <FieldSet>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>
                    {field.name[0].toUpperCase() + field.name.slice(1)}
                  </FieldLabel>
                  <Input placeholder="John Doe" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel id={field.name}>
                    {field.name[0].toUpperCase() + field.name.slice(1)}
                  </FieldLabel>
                  <Input
                    id={field.name}
                    placeholder="john@example.com"
                    {...field}
                    type="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel id={field.name}>
                    {field.name[0].toUpperCase() + field.name.slice(1)}
                  </FieldLabel>
                  <Input
                    id={field.name}
                    placeholder="******"
                    {...field}
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel id={field.name}>
                    {field.name[0].toUpperCase() + field.name.slice(1)}
                  </FieldLabel>
                  <Input
                    id={field.name}
                    placeholder="******"
                    {...field}
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field>
              <Button type="submit">Sign Up</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
};
