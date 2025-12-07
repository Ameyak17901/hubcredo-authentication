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
import { signInSchema } from "./schema";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";

export const SignInForm = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof signInSchema>) => {
      const { email, password } = data;

      const { error } = await signIn(email, password);

      if (error) {
        toast.error(error.message);
        form.reset();
        return;
      }

      toast.success("Signed in successfully!");
      navigate("/");
      form.reset();
    }
  );

  return (
    <div className="m-1">
      <form onSubmit={onSubmit}>
        <FieldSet>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>
                    {field.name[0].toUpperCase() + field.name.slice(1)}
                  </FieldLabel>
                  <Input
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
            <Field>
              <Button type="submit">Sign In</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
};
