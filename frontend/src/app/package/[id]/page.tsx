"use client";
import Image from "next/image";
import data from "@/dummydata.json";
import { Packages } from "@/types";
import { Button } from "@/components/ui/button";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPackageById } from "@/actions/packagesAction";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

function Package({}: Props) {
  const { id } = useParams() as { id: string };
  const [destination, setDestination] = useState<Packages | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPackageById(id)
      .then((res) => {
        setDestination(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Skeleton className="h-[90vh] w-[90vw]" />
      </div>
    );
  }

  if (!destination && !loading) {
    return notFound();
  }

  return (
    destination && (
      <div className="relative m-auto h-[90vh] w-[90%] rounded-lg border-4 bg-primary p-12">
        <Image
          src={destination.imageUrl}
          alt="Destination Image"
          layout="fill"
          className="rounded-lg object-cover"
        />
        <div className="absolute bottom-0 left-0 flex h-full w-full flex-col items-start justify-end gap-4 bg-gradient-to-r from-primary/40 to-transparent p-8 text-white sm:p-16 md:p-24 lg:w-1/2">
          <h2 className="font-dm-serif-display text-5xl font-bold sm:text-7xl md:whitespace-nowrap md:text-8xl">
            {destination.title}
          </h2>
          <h3 className="text-xl font-normal sm:text-3xl md:text-4xl">
            {destination.destination}
          </h3>

          <p className="font-dm-serif-display text-2xl font-normal sm:text-4xl md:text-5xl">
            ₹<span className="font-dm-serif-display">{destination.price} </span>
            <span className="text-base font-normal sm:text-lg md:text-xl">
              per person
            </span>
          </p>

          <h4 className="text-xl font-normal md:text-2xl">Available Dates :</h4>
          <div className="flex flex-wrap gap-2">
            {destination.availableDates.map((date) => (
              <Button
                key={date}
                className="text-sm sm:text-base md:text-lg"
                variant={"secondary"}
              >
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Button>
            ))}
          </div>

          <p className="text-base font-normal sm:text-xl">
            {destination.description}
          </p>
          <Link href={`/booking?id=${destination._id}`}>
            <Button size={"lg"} className="w-fit text-lg md:text-xl">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    )
  );
}

export default Package;
