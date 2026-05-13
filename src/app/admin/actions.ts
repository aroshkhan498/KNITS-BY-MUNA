"use server";

import { put } from "@vercel/blob";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createCategory(formData: FormData) {
  try {
    if (!process.env.POSTGRES_URL && !process.env.POSTGRES_URL_NON_POOLING && !process.env.DATABASE_URL) {
      return { error: "Database is not configured. Add POSTGRES_URL (or DATABASE_URL) before creating categories." };
    }

    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim() || null;
    const sortOrderValue = Number(formData.get("sortOrder") || 0);

    if (!name) {
      return { error: "Category name is required." };
    }

    const slugBase = slugify(name);
    const existing = await db.select({ slug: categories.slug }).from(categories);
    const existingSlugs = new Set(existing.map((item) => item.slug));

    let slug = slugBase;
    let counter = 2;
    while (existingSlugs.has(slug)) {
      slug = `${slugBase}-${counter}`;
      counter += 1;
    }

    const inserted = await db.insert(categories).values({
      name,
      slug,
      description,
      sortOrder: Number.isFinite(sortOrderValue) ? sortOrderValue : 0,
    }).returning({ id: categories.id });

    revalidatePath("/");
    revalidatePath("/shop");
    revalidatePath("/categories");
    revalidatePath("/admin");

    return { success: true, categoryId: inserted[0]?.id };
  } catch (error: any) {
    console.error("Create category error:", error);
    return { error: error.message || "Failed to create category" };
  }
}

export async function saveProduct(formData: FormData) {
  try {
    if (!process.env.POSTGRES_URL && !process.env.POSTGRES_URL_NON_POOLING && !process.env.DATABASE_URL) {
      return { error: "Database is not configured. Add POSTGRES_URL (or DATABASE_URL) before saving products." };
    }

    const id = formData.get("id") as string | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const discountedPriceStr = formData.get("discountedPrice") as string | null;
    const discountedPrice = discountedPriceStr
      ? parseFloat(discountedPriceStr)
      : null;
    const categoryId = (formData.get("categoryId") as string | null) || null;
    const inStock = formData.get("inStock") === "on";
    const imageFile = formData.get("image") as File | null;

    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return { error: "Image storage is not configured. Add BLOB_READ_WRITE_TOKEN before uploading products." };
      }

      const blob = await put(`products/${Date.now()}-${imageFile.name}`, imageFile, {
        access: "public",
      });
      imageUrl = blob.url;
    }

    if (id) {
      const updateData: any = {
        title,
        description,
        price: price.toString(),
        discountedPrice: discountedPrice ? discountedPrice.toString() : null,
        categoryId,
        inStock,
        updatedAt: new Date(),
      };
      if (imageUrl) updateData.imageUrl = imageUrl;

      await db.update(products).set(updateData).where(eq(products.id, Number(id)));
    } else {
      if (!imageUrl) {
        return { error: "Please choose a real product image before saving." };
      }

      await db.insert(products).values({
        title,
        description,
        price: price.toString(),
        discountedPrice: discountedPrice ? discountedPrice.toString() : null,
        imageUrl,
        categoryId,
        inStock,
      });
    }

    revalidatePath("/");
    revalidatePath("/shop");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Save product error:", error);
    return { error: error.message || "Failed to save product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    if (!process.env.POSTGRES_URL && !process.env.POSTGRES_URL_NON_POOLING && !process.env.DATABASE_URL) {
      return { error: "Database is not configured. Add POSTGRES_URL (or DATABASE_URL) before deleting products." };
    }

    await db.delete(products).where(eq(products.id, Number(id)));
    revalidatePath("/");
    revalidatePath("/shop");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Delete product error:", error);
    return { error: error.message || "Failed to delete product" };
  }
}
