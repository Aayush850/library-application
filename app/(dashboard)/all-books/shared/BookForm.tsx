"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { createBookSchema } from "@/utils/validators";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@/utils/uploadthing";
import { createBook, updateBook } from "@/actions/book.actions";
import Image from "next/image";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Book, type Genre } from "@/types";

type BookFormProps = {
  genres: Genre[];
  mode: "Edit" | "Create";
  existingBook?: Book;
};

const BookForm: React.FC<BookFormProps> = ({ genres, mode, existingBook }) => {
  const form = useForm<z.infer<typeof createBookSchema>>({
    resolver: zodResolver(createBookSchema),
    defaultValues:
      mode === "Create"
        ? {
            title: "",
            author: "",
            description: "",
            genreId: undefined,
            stock: 0,
            cover: "",
          }
        : {
            title: existingBook!.title,
            author: existingBook!.author,
            description: existingBook!.description || "",
            genreId: existingBook!.genreId,
            stock: existingBook!.stock,
            cover: existingBook!.cover,
          },
  });

  async function onSubmit(data: z.infer<typeof createBookSchema>) {
    if (mode === "Create") {
      const res = await createBook(data);
      if (res.success) {
        toast.success(res.message);
        form.reset();
        redirect("/all-books");
      } else {
        toast.error(res.message);
      }
    } else {
      const bookId = `${existingBook!.id}`;
      const res = await updateBook(bookId, data);
      if (res.success) {
        toast.success(res.message);
        redirect("/all-books");
      } else {
        toast.error(res.message);
      }
    }
  }

  const image = form.watch("cover");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Title</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Title of the book."
                autoComplete="off"
                name="title"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="author"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Author</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Author of the book."
                autoComplete="off"
                name="author"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="genreId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Genre</FieldLabel>

              <Select
                value={field.value !== undefined ? field.value.toString() : ""}
                onValueChange={(val) => field.onChange(Number(val))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Genre of the book." />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="cover"
          control={form.control}
          render={({ fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Cover Image</FieldLabel>
              <div className="flex gap-4">
                {image && (
                  <Image
                    key={image}
                    src={image}
                    alt="cover-image"
                    height={64}
                    width={64}
                  />
                )}
                <UploadButton
                  appearance={{
                    button:
                      "text-sm ut-ready:bg-primary ut-uploading:cursor-not-allowed ut-uploading:bg-primary",
                    container: "flex-row justify-start gap-2",
                    allowedContent: "text-foreground",
                  }}
                  endpoint={"imageUploader"}
                  onClientUploadComplete={(res) => {
                    form.setValue("cover", res[0].ufsUrl, {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="stock"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Stock</FieldLabel>
              <Input
                {...field}
                type="number"
                aria-invalid={fieldState.invalid}
                placeholder="Available Stock."
                autoComplete="off"
                onChange={(e) => field.onChange(Number(e.target.value))}
                value={field.value}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Description</FieldLabel>
              <Textarea placeholder="Description of the book." {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit" className="cursor-pointer">
            Submit
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default BookForm;
