"use client";
import { MenuIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { FcGoogle } from "react-icons/fc";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";

const ButtonTrigger = () => {
  return (
    <DialogTrigger asChild>
      <Button className="lg:inline-flex">Sign up</Button>
    </DialogTrigger>
  );
};

export const Navbar5 = () => {
  const features = [
    {
      title: "Dashboard",
      description: "Overview of your activity",
      href: "#",
    },
    {
      title: "Analytics",
      description: "Track your performance",
      href: "#",
    },
    {
      title: "Settings",
      description: "Configure your preferences",
      href: "#",
    },
    {
      title: "Integrations",
      description: "Connect with other tools",
      href: "#",
    },
    {
      title: "Storage",
      description: "Manage your files",
      href: "#",
    },
    {
      title: "Support",
      description: "Get help when needed",
      href: "#",
    },
  ];

  return (
    <section className="fixed top-0 z-50 w-full bg-background border-b py-4">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <a
            href="https://www.shadcnblocks.com"
            className="flex items-center gap-2"
          >
            <Image
              src="https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg"
              className="max-h-8"
              alt="Shadcn UI Navbar"
              width={32}
              height={32}
            />
            <span className="text-lg font-semibold tracking-tighter">
              Shadcnblocks.com
            </span>
          </a>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 p-3">
                    {features.map((feature, index) => (
                      <NavigationMenuLink
                        href={feature.href}
                        key={index}
                        className="rounded-md p-3 transition-colors hover:bg-muted/70"
                      >
                        <div key={feature.title}>
                          <Label className="mb-1 font-semibold text-foreground">
                            {feature.title}
                          </Label>
                          <Label className="text-sm text-muted-foreground">
                            {feature.description}
                          </Label>
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Products
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Resources
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
              <Dialog>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Sign In</DialogTitle>
                    
                      </DialogHeader>
                       <div className="flex flex-col gap-4">
                            <Button variant="outline" className="w-full">
                              <FcGoogle className="mr-2 size-5" />
                              Sign up with Google
                            </Button>
                          </div>
                    </DialogContent>

                    <ButtonTrigger />
              </Dialog>
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <a
                    href="https://www.shadcnblocks.com"
                    className="flex items-center gap-2"
                  >
                    <Image
                      src="https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg"
                      className="max-h-8"
                      alt="Shadcn UI Navbar"
                      width={32}
                      height={32}
                    />
                    <span className="text-lg font-semibold tracking-tighter">
                      Shadcnblocks.com
                    </span>
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <Accordion type="single" collapsible className="mt-4 mb-2">
                  <AccordionItem value="solutions" className="border-none">
                    <AccordionTrigger className="text-base hover:no-underline">
                      Features
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid md:grid-cols-2">
                        {features.map((feature, index) => (
                          <a
                            href={feature.href}
                            key={index}
                            className="rounded-md p-3 transition-colors hover:bg-muted/70"
                          >
                            <div key={feature.title}>
                              <Label className="mb-1 font-semibold text-foreground">
                                {feature.title}
                              </Label>
                              <Label className="text-sm text-muted-foreground">
                                {feature.description}
                              </Label>
                            </div>
                          </a>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex flex-col gap-6">
                  <a href="#" className="font-medium">
                    Templates
                  </a>
                  <a href="#" className="font-medium">
                    Blog
                  </a>
                  <a href="#" className="font-medium">
                    Pricing
                  </a>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <Dialog>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Sign In</DialogTitle>
                    
                      </DialogHeader>
                       <div className="flex flex-col gap-4">
                            <Button variant="outline" className="w-full">
                              <FcGoogle className="mr-2 size-5" />
                              Sign up with Google
                            </Button>
                          </div>
                    </DialogContent>

                    <ButtonTrigger />
                  </Dialog>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};
