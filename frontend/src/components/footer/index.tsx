import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import React from "react";

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="mt-8 flex w-full items-center justify-between bg-primary p-4 text-center text-2xl text-background">
      <h3 className="p-4 text-center font-dm-serif-display text-4xl">
        Jounery Wise
      </h3>
      <div className="flex justify-center space-x-4">
        <Facebook />
        <Instagram />
        <Twitter />
        <Youtube />
      </div>
    </footer>
  );
}

export default Footer;
