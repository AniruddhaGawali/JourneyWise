"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  createPackage,
  getAllPackages,
  deletePackage,
  updatePackage,
} from "@/actions/packagesAction";
import { getBookings } from "@/actions/bookingAction";
import { Invoice, Packages } from "@/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import AvailableDatesInput from "@/components/dateInput";
import { Pen, Trash2 } from "lucide-react";

type Props = {};

const formSchema = z.object({
  title: z.string().nonempty(),
  destination: z.string().nonempty(),
  price: z.preprocess((val) => Number(val), z.number().int().positive()),
  description: z.string().nonempty(),
  imageUrl: z.string().nonempty(),
  availableDates: z.array(z.string().nonempty()),
});

function AdminPage({}: Props) {
  const [allPackages, setAllPackages] = useState<Packages[]>([]);
  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(-1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      destination: "",
      price: 0,
      description: "",
      imageUrl: "",
      availableDates: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newPackage: Packages = {
      title: values.title,
      destination: values.destination,
      price: values.price,
      description: values.description,
      imageUrl: values.imageUrl,
      availableDates: values.availableDates,
    };
    if (isEditing >= 0) {
      updatePackage(allPackages[isEditing]._id as string, newPackage)
        .then((res) => {
          const newPackages: Packages[] = [...allPackages];
          newPackages[isEditing] = res;
          setAllPackages(newPackages);
          setModelOpen(false);
          setIsEditing(-1);
        })
        .catch((err) => {
          console.error("Error updating package:", err);
        });
      return;
    }

    createPackage(newPackage)
      .then((res) => {
        setAllPackages([...allPackages, res]);
        setModelOpen(false);
      })
      .catch((err) => {
        console.error("Error creating package:", err);
      });
  }

  useEffect(() => {
    getAllPackages()
      .then((res) => {
        setAllPackages(res);
      })
      .catch((err) => {
        console.error("Error fetching packages:", err);
      });

    getBookings()
      .then((res) => {
        setAllInvoices(res);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });
  }, []);

  useEffect(() => {
    if (!modelOpen) {
      form.reset();
      setIsEditing(-1);
    }
  }, [modelOpen]);

  console.log(allPackages);

  return (
    <div className="container relative mx-auto min-h-screen w-full px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-10 text-center text-4xl font-bold">Admin Panel</h1>

      <Tabs defaultValue="packages" className="w-full">
        <TabsList className="flex justify-center space-x-4">
          <TabsTrigger value="packages" className="w-full">
            Packages
          </TabsTrigger>
          <TabsTrigger value="invoice" className="w-full">
            Invoice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="packages" className="mt-8 h-full">
          <div className="">
            <Dialog
              onOpenChange={(isOpen) => {
                if (!isOpen) {
                  form.reset(); // Reset the form when the dialog is closed
                  setIsEditing(-1); // Reset the editing index
                }
                setModelOpen(isOpen); // Update the model open state
              }}
              open={modelOpen}
            >
              <DialogTrigger asChild>
                <Button className="fixed bottom-10 right-10 transform py-12 text-8xl text-white shadow-lg transition-transform hover:scale-110">
                  +
                </Button>
              </DialogTrigger>
              <DialogContent className="my-4 h-[90vh] w-full sm:max-w-xl">
                <DialogHeader>
                  <DialogTitle>
                    {isEditing < 0 ? "Edit Package" : "Create Package"}
                  </DialogTitle>
                  <DialogDescription>
                    {isEditing < 0
                      ? "Edit the package details"
                      : "Fill in the package details"}
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="overflow-x-scroll p-4"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="title" {...field} />
                          </FormControl>
                          <FormDescription>
                            The title of the package
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Destination</FormLabel>
                          <FormControl>
                            <Input placeholder="destination" {...field} />
                          </FormControl>
                          <FormDescription>
                            The destination of the package
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="price"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The price of the package
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="description" {...field} />
                          </FormControl>
                          <FormDescription>
                            The description of the package
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="image url" {...field} />
                          </FormControl>
                          <FormDescription>
                            The image URL of the package
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="availableDates"
                      render={({ field }) => (
                        <AvailableDatesInput
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />

                    <DialogFooter className="mt-4 sm:justify-start">
                      <>
                        <Button type="submit" variant="default">
                          {form.formState.isSubmitting ? "Saving..." : "Save"}
                        </Button>
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Cancel
                          </Button>
                        </DialogClose>
                      </>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            <h2 className="mb-6 text-2xl font-semibold">All Packages</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allPackages.map((pack, index) => (
                <div
                  key={pack._id}
                  className="relative rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
                >
                  <Button
                    className="absolute right-16 top-2"
                    onClick={() => {
                      form.setValue("title", pack.title);
                      form.setValue("destination", pack.destination);
                      form.setValue("price", pack.price);
                      form.setValue("description", pack.description);
                      form.setValue("imageUrl", pack.imageUrl);
                      form.setValue("availableDates", pack.availableDates);

                      setIsEditing(index);
                      setModelOpen(true);
                    }}
                    size="icon"
                  >
                    <Pen size={24} />
                  </Button>

                  <Button
                    className="absolute right-2 top-2"
                    onClick={() => {
                      deletePackage(pack._id as string)
                        .then((data) => {
                          setAllPackages(
                            allPackages.filter((p) => p._id !== pack._id),
                          );
                        })
                        .catch((err) => {
                          console.error("Error deleting package:", err);
                        });
                    }}
                    variant="destructive"
                    size="icon"
                  >
                    <Trash2 />
                  </Button>

                  <img
                    src={pack.imageUrl}
                    alt={pack.title}
                    className="h-40 w-full rounded-t-lg object-cover"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">{pack.title}</h3>
                    <p className="text-sm text-secondary-foreground">
                      {pack.destination}
                    </p>
                    <p className="text-lg font-medium text-accent">
                      ${pack.price}
                    </p>
                    <p className="mt-2 text-sm text-secondary-foreground">
                      {pack.description}
                    </p>
                    <div className="mt-2 flex flex-wrap items-start justify-start gap-1 text-sm text-secondary-foreground">
                      Available Dates:{" "}
                      {pack.availableDates.map((date) => (
                        <span
                          key={date}
                          className="inline-block rounded-full border border-accent px-2"
                        >
                          {new Date(date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="invoice" className="mt-8">
          <h2 className="mb-6 text-2xl font-semibold">All Invoices</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allInvoices.map((invoice) => (
              <div
                key={invoice._id}
                className="relative rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold">{invoice.name}</h3>
                <p className="text-sm text-secondary-foreground">
                  Email: {invoice.email}
                </p>
                <p className="text-sm text-secondary-foreground">
                  Phone: {invoice.phone}
                </p>
                <p className="text-sm text-secondary-foreground">
                  Travellers: {invoice.noOfTravellers}
                </p>
                <p className="text-sm text-secondary-foreground">
                  Booking Date:{" "}
                  {new Date(invoice.bookingDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <div className="mt-4 border-t pt-4">
                  <h4 className="text-md font-mediumtext-secondary-foreground">
                    Package Details
                  </h4>
                  <p className="text-sm text-secondary-foreground">
                    {invoice.package.title}
                  </p>
                  <p className="text-sm text-secondary-foreground">
                    Destination: {invoice.package.destination}
                  </p>
                  <p className="text-lg font-medium text-accent">
                    Price: ${invoice.package.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminPage;
