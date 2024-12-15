"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Booking, Packages } from "@/types";
import Image from "next/image";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getAllPackages } from "@/actions/packagesAction";
import { createBooking } from "@/actions/bookingAction";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  packageId: z.string(),
  name: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/),
  noOfTravelers: z.preprocess(
    (val) => Number(val),
    z.number().int().positive(),
  ),
  bookingDate: z.string(),
  requests: z.string().optional(),
});

function BookingForm() {
  const [id, setId] = useState(useSearchParams().get("id") as string);
  const [allPackages, setAllPackages] = useState<Packages[]>([]);
  const destination = allPackages.find(
    (destination) => destination._id === id,
  ) as Packages;
  const [loading, setLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getAllPackages()
      .then((data) => {
        setAllPackages(data);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!destination) return;

    form.setValue(
      "bookingDate",
      new Date(destination.availableDates[0]).toISOString(),
    );
  }, [id, destination]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packageId: id,
      name: "",
      email: "",
      phone: "",
      noOfTravelers: 1,
      requests: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsBooking(true);
    const newBooking: Booking = {
      packageId: values.packageId,
      name: values.name,
      email: values.email,
      phone: values.phone,
      noOfTravellers: values.noOfTravelers,
      bookingDate: values.bookingDate,
      request: values.requests ?? "",
    };

    createBooking(newBooking)
      .then((data) => {
        console.log(data);
        router.push(`/invoice/${data._id}`);
      })
      .catch(console.error)
      .finally(() => {
        setIsBooking(false);
      });
  }

  if (!destination || !allPackages || !allPackages.length || loading) {
    return (
      <div className="flex min-h-screen w-screen items-center justify-center bg-secondary/70 py-8">
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-secondary/70 py-8">
      <div className="flex min-h-[90%] w-[90%] min-w-[35%] items-center justify-center rounded-lg border bg-background p-10 lg:w-[70%] xl:w-auto">
        <section className="flex w-full flex-col items-center justify-center gap-4 p-8 md:w-[50vw]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="packageId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Package</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          setId(value);
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {allPackages.map((destination) => (
                            <SelectItem
                              key={destination._id}
                              value={destination._id as string}
                            >
                              {destination.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>Please enter the package</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please enter your full name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please enter your email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="phone" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please enter your phone number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="noOfTravelers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No of Travelers</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="no of travelers"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please enter the number of travelers
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bookingDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Booking Date</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(new Date(value).toISOString());
                        }}
                        defaultValue={new Date(
                          destination.availableDates[0],
                        ).toISOString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {destination.availableDates.map((date) => (
                            <SelectItem key={date} value={date}>
                              {new Date(date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>Please enter the package</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="any special requests "
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please enter any special requests
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isBooking} type="submit">
                {isBooking ? "Booking..." : "Book Now"}
              </Button>
            </form>
          </Form>
        </section>
        <section className="relative m-auto hidden h-[80vh] w-[90%] rounded-lg border bg-primary p-12 md:flex">
          <Image
            src={destination.imageUrl}
            alt="Destination Image"
            layout="fill"
            className="rounded-lg object-cover"
          />
          <div className="absolute bottom-0 left-0 space-y-2 rounded-lg bg-secondary/70 p-4">
            <h1 className="font-dm-serif-display text-6xl font-bold text-white">
              {destination.title}
            </h1>
            <p className="text-white">{destination.description}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BookingForm;
