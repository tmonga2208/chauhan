import {Menu} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

interface MenuItem {
  title: string;
  url: string;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "/tm.png",
    alt: "logo",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Sports Air Guns",
      url: "/categories",
      items: [
        {
          title: "Old Air Rifles",
          url: "/categories/airrifle",
        },
        {
          title: "Old Air Pistols",
          url: "/categories/airpistol",
        },
      ],
    },
    {
      title: "Pellets",
      url: "#",
    },
    {
      title: "Accessories",
      url: "#",
    },
  ],
}: Navbar1Props) => {
  return (
    <section className="sticky top-0 z-50 py-4 bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]">
      <div className="mx-4">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex ">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <Image src={logo.src} className="max-h-12" width={120} height={100} alt={logo.alt} />
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="gap-4">
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {/* <ContactButton /> */}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-12" alt={logo.alt} />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="max-h-8" alt={logo.alt} />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    {/* <ContactButton /> */}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem className="text-white bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a] hover:text-white"  key={item.title}>
        <NavigationMenuTrigger className="text-white bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a] hover:text-white">{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a] text-white hover:text-white">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-40 ">
              <SubMenuLink  item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a] text-white hover:text-white px-4 py-2 text-sm font-medium transition-colors"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none "
      href={item.url}
    >
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
      </div>
    </a>
  );
};

export { Navbar1 };
