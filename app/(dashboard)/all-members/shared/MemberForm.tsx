"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMemberSchema } from "@/utils/validators";
import z from "zod";
import { createMember, updateMember } from "@/actions/member.actions";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { type Member } from "@/types";

const MemberForm = ({
  mode,
  existingMember,
}: {
  mode: "Create" | "Edit";
  existingMember?: Member;
}) => {
  const form = useForm<z.infer<typeof createMemberSchema>>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: existingMember
      ? {
          name: existingMember!.name,
          phone: existingMember!.phone,
          address: existingMember!.address,
          membershipId: existingMember.membershipId,
        }
      : {
          name: "",
          phone: "",
          address: "",
          membershipId: "",
        },
  });
  async function onSubmit(data: z.infer<typeof createMemberSchema>) {
    if (mode === "Create") {
      const { success, message } = await createMember(data);
      if (success) {
        toast.success(message);
        form.reset();
        redirect("/all-members");
      } else {
        toast.error(message);
      }
    } else {
      const memberId = `${existingMember!.id}`;
      const { success, message } = await updateMember(memberId, data);
      if (success) {
        toast.success(message);
        redirect("/all-members");
      } else {
        toast.error(message);
      }
    }
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input id="phone" {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="membershipId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="membershipId">Membership Id</FieldLabel>
              <Input id="membershipId" {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input id="address" {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" className="cursor-pointer">
          Submit
        </Button>
      </FieldGroup>
    </form>
  );
};
export default MemberForm;
