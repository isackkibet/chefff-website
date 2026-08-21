import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { menuItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// GET /api/admin/menu
export async function GET() {
  try {
    const rows = await db.select().from(menuItems).orderBy(menuItems.category);
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[GET /api/admin/menu]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

const itemSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  price: z.number().int().min(1),
  image: z.string().optional(),
  ingredients: z.array(z.string()).optional(),
  allergens: z.array(z.string()).optional(),
  dietary: z.array(z.string()).optional(),
  available: z.boolean().optional(),
  chefPick: z.boolean().optional(),
});

// POST /api/admin/menu
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = itemSchema.parse(body);
    const [row] = await db
      .insert(menuItems)
      .values({
        name: data.name,
        category: data.category,
        description: data.description,
        price: data.price,
        image: data.image,
        ingredients: data.ingredients ? JSON.stringify(data.ingredients) : null,
        allergens: data.allergens ? JSON.stringify(data.allergens) : null,
        dietary: data.dietary ? JSON.stringify(data.dietary) : null,
        available: data.available ?? true,
        chefPick: data.chefPick ?? false,
      })
      .returning();
    return NextResponse.json(row, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError)
      return NextResponse.json(
        { error: "Validation failed", details: err.issues },
        { status: 422 },
      );
    console.error("[POST /api/admin/menu]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

const patchSchema = itemSchema.partial().extend({ id: z.number().int() });

// PATCH /api/admin/menu
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = patchSchema.parse(body);
    const updates: Record<string, unknown> = {};
    if (rest.name !== undefined) updates.name = rest.name;
    if (rest.category !== undefined) updates.category = rest.category;
    if (rest.description !== undefined) updates.description = rest.description;
    if (rest.price !== undefined) updates.price = rest.price;
    if (rest.image !== undefined) updates.image = rest.image;
    if (rest.available !== undefined) updates.available = rest.available;
    if (rest.chefPick !== undefined) updates.chefPick = rest.chefPick;
    if (rest.ingredients !== undefined)
      updates.ingredients = JSON.stringify(rest.ingredients);
    if (rest.allergens !== undefined)
      updates.allergens = JSON.stringify(rest.allergens);
    if (rest.dietary !== undefined)
      updates.dietary = JSON.stringify(rest.dietary);

    const [row] = await db
      .update(menuItems)
      .set(updates)
      .where(eq(menuItems.id, id))
      .returning();
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(row);
  } catch (err) {
    if (err instanceof z.ZodError)
      return NextResponse.json(
        { error: "Validation failed", details: err.issues },
        { status: 422 },
      );
    console.error("[PATCH /api/admin/menu]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE /api/admin/menu?id=123
export async function DELETE(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.searchParams.get("id"));
    if (!id)
      return NextResponse.json({ error: "id required" }, { status: 400 });
    await db.delete(menuItems).where(eq(menuItems.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/admin/menu]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
