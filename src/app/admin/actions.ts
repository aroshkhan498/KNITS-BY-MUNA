"use server";

import { put } from "@vercel/blob";
import { db } from "@/db";
import { products } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function saveProduct(formData: FormData) {
  try {
    const id = formData.get("id") as string | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const discountedPriceStr = formData.get("discountedPrice") as string | null;
    const discountedPrice = discountedPriceStr
      ? parseFloat(discountedPriceStr)
      : null;
    const inStock = formData.get("inStock") === "on";
    const imageFile = formData.get("image") as File | null;

    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        imageUrl = "/logo.png";
      } else {
        const blob = await put(`products/${Date.now()}-${imageFile.name}`, imageFile, {
          access: "public",
        });
        imageUrl = blob.url;
      }
    }

    if (id) {
      const updateData: any = {
        title,
        description,
        price: price.toString(),
        discountedPrice: discountedPrice ? discountedPrice.toString() : null,
        inStock,
        updatedAt: new Date(),
      };
      if (imageUrl) updateData.imageUrl = imageUrl;

      if (process.env.POSTGRES_URL) {
        await db.update(products).set(updateData).where(eq(products.id, id));
      }
    } else {
      if (!imageUrl) imageUrl = "/logo.png";

      if (process.env.POSTGRES_URL) {
        await db.insert(products).values({
          title,
          description,
          price: price.toString(),
          discountedPrice: discountedPrice ? discountedPrice.toString() : null,
          imageUrl,
          inStock,
        });
      }
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
    if (process.env.POSTGRES_URL) {
      await db.delete(products).where(eq(products.id, id));
    }
    revalidatePath("/");
    revalidatePath("/shop");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Delete product error:", error);
    return { error: error.message || "Failed to delete product" };
  }
}
