"use client";
import { getAllPackages } from "@/actions/packagesAction";
import AllDestination from "@/components/AllDestination";

import Header from "@/components/header";
import TopDestinations from "@/components/TopDestination";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { Packages } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [destination, setDestination] = useState<Packages[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllPackages()
      .then((res) => {
        setDestination(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  console.log("destination", destination);

  return (
    <>
      <div className="flex flex-col items-center">
        <div>
          <ShootingStars />
          <Header />
          <TopDestinations
            isLoading={isLoading}
            top10Destinations={destination.slice(0, 5)}
          />
        </div>
        <AllDestination isLoading={isLoading} allDestination={destination} />
      </div>
    </>
  );
}
