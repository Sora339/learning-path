import Image from "next/image";
import Link from "next/link";

import { Category } from "@/types/category";

export default async function CategorySection() {
  const res = await fetch(`${process.env.BASE_URL}/api/categories`);

  const categories: Category[] = await res.json();

  return (
    <div className="bg-muted">
      <div className="flex justify-center">
        <div className="w-[95%] px-[10px] py-[150px] pt-[100px] lg:w-[70%]">
          <div>
            <h2 className="mb-[50px] text-center text-[35px] font-bold">カテゴリから探す</h2>
            <div className="grid grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((category) => (
                <Link href={`/category/${category.id}`} key={category.id}>
                  <div className="flex items-center gap-3 rounded-md border bg-white p-4">
                    {category.image && (
                      <Image src={category.image} width={60} height={60} alt={category.name} className="rounded-md" />
                    )}
                    <h3 className="text-[17px] font-bold">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
