import { cn } from "@/lib/utils";
import Image from "next/image";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-6 md:auto-rows-[18rem] md:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  header,
}: {
  className?: string;
  title: string;
  header: string;
}) => {
  return (
    <div
      className={cn(
        "group/bento  shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border p-4 m-4 md:m-0 transition duration-200 hover:shadow-xl border-white/[0.2] bg-black shadow-none",
        className,
      )}
    >
      <Image src={header} alt={title} height={1000} width={1000} className="object-cover rounded-md aspect-[10/9]" />
        <div className="mt-2 mb-2 font-sans font-bold text-neutral-200">
          {title}
        </div>

    </div>
  );
};
