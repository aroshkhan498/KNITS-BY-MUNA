import { db } from "@/db";
import { categories } from "@/db/schema";
import { asc } from "drizzle-orm";
import { ProductForm } from "@/components/product-form";

export default async function NewProductPage() {
  let categoryList: any[] = [];

  if (process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL) {
    try {
      categoryList = await db.select().from(categories).orderBy(asc(categories.sortOrder), asc(categories.name));
    } catch {
      categoryList = [];
    }
  }

  return (
    <div className="space-y-6">
      <ProductForm categories={categoryList} />
    </div>
  );
}
