import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { items } from "@/data/data";
 

function CategoriesComp() {
  return (
      <div>
          <p className=" ml-4 text-6xl font-black mb-4  flex justify-center items-center bg-clip-text py-8 text-transparent bg-gradient-to-r from-white via-gray-400 to-white drop-shadow-lg">Shop By Categories</p>
          <BentoGrid className="max-w-5xl mx-auto">
      {items.map((item, i) => (
          <BentoGridItem
              className="flex items-center justify-center"
          key={i}
          title={item.title}
          header={item.header}
        />
      ))}
    </BentoGrid>
          
    </div>
  )
}

export default CategoriesComp

