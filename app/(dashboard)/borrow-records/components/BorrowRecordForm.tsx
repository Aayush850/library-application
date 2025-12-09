"use client";
import { findAvailableBooks } from "@/actions/book.actions";
import { findAllMembers } from "@/actions/member.actions";
import AsyncSelect from "react-select/async";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBorrowRecordSchema } from "@/utils/validators";
import { createBorrowRecord } from "@/actions/borrow-records.actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useTheme } from "next-themes";

const BorrowRecordForm = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const form = useForm<z.infer<typeof createBorrowRecordSchema>>({
    resolver: zodResolver(createBorrowRecordSchema),
  });

  async function onSubmit(data: z.infer<typeof createBorrowRecordSchema>) {
    const { success, message } = await createBorrowRecord(data);
    if (success) {
      toast.success(message);
      redirect("/borrow-records");
    } else {
      toast.error(message);
    }
  }

  const loadBookOptions = async (inputValue: string) => {
    const { books } = await findAvailableBooks(inputValue);
    const options = books.map((book) => {
      return {
        label: `${book.title} (${book.stock} available)`,
        value: book.id,
      };
    });
    return options;
  };

  const loadMemberOptions = async (inputValue: string) => {
    const { members } = await findAllMembers(inputValue);
    const options = members.map((member) => {
      return {
        label: member.name,
        value: member.id,
      };
    });
    return options;
  };

 const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    // Apply transparency depending on theme
    backgroundColor: isDark
      ? "color-mix(in oklab, var(--input) 30%, transparent)"
      : "color-mix(in oklab, var(--input))",
    borderColor: state.isFocused ? "var(--ring)" : "var(--border)",
    boxShadow: state.isFocused ? "0 0 0 1px var(--ring)" : "none",
    color: "var(--foreground)",
    minHeight: "2.5rem",
    borderRadius: "var(--radius)",
    "&:hover": {
      borderColor: "var(--ring)",
    },
  }),

  valueContainer: (base: any) => ({
    ...base,
    padding: "0 0.5rem",
  }),

  singleValue: (base: any) => ({
    ...base,
    color: "var(--foreground)",
  }),

  input: (base: any) => ({
    ...base,
    color: "var(--foreground)",
  }),

  placeholder: (base: any) => ({
    ...base,
    color:"var(--foregorund)"
  }),

  menu: (base: any) => ({
    ...base,
    backgroundColor: "var(--card)", // fully opaque
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    overflow: "hidden",
  }),

  menuList: (base: any) => ({
    ...base,
    padding: 0,
    background: "var(--card)", // fully opaque
  }),

  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? "var(--accent)" : "transparent",
    color: state.isFocused ? "var(--accent-foreground)" : "var(--foreground)",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "var(--accent)",
    },
  }),

  noOptionsMessage: (base: any) => ({
    ...base,
    color: "var(--muted-foreground)",
  }),

  loadingMessage: (base: any) => ({
    ...base,
    color: "var(--muted-foreground)",
  }),

  dropdownIndicator: (base: any) => ({
    ...base,
    color: "var(--muted-foreground)",
    "&:hover": {
      color: "var(--foreground)",
    },
  }),

  indicatorSeparator: () => ({
    backgroundColor: "var(--border)",
  }),
};

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="bookId"
          control={form.control}
          render={({ fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="bookId">Select Book</FieldLabel>
              <AsyncSelect
                instanceId={"bookId"}
                loadOptions={loadBookOptions}
                defaultOptions
                cacheOptions
                onChange={(e) => form.setValue("bookId", `${e?.value}`)}
                styles={selectStyles}
                placeholder={"Select Book"}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        ></Controller>

        <Controller
          name="memberId"
          control={form.control}
          render={({ fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="memberId">Select Member</FieldLabel>
              <AsyncSelect
                instanceId={"memberId"}
                loadOptions={loadMemberOptions}
                defaultOptions
                cacheOptions
                onChange={(e) => form.setValue("memberId", `${e?.value}`)}
                placeholder={"Select Member"}
                styles={selectStyles}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        ></Controller>

        <Controller
          name="dueDate"
          control={form.control}
          render={({ field, fieldState }) => {
            const today = new Date();
            const minDate = today.toISOString().split("T")[0];
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="dueDate">Due Date</FieldLabel>
                <Input
                  id="dueDate"
                  type="date"
                  min={minDate}
                  value={field.value ? field.value.split("T")[0] : ""}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    field.onChange(date.toISOString());
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />

        <Button type="submit" className="cursor-pointer">
          Submit
        </Button>
      </FieldGroup>
    </form>
  );
};
export default BorrowRecordForm;
