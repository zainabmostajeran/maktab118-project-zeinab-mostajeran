import { NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";

const cartDbPath = path.join(process.cwd(), "data", "cartDb.json");

/**
 * Helper to read cartDb.json
 */
async function readCartDb() {
  try {
    const data = await fsPromises.readFile(cartDbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading cartDb.json:", error);
    return { users: [] };
  }
}

/**
 * Helper to write to cartDb.json
 */
async function writeCartDb(data: any) {
  try {
    await fsPromises.writeFile(cartDbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing cartDb.json:", error);
  }
}

/**
 * GET /api/cart?userId=...
 *   -> Return the full cart for a specific user
 *
 * POST /api/cart?userId=...
 *   -> Add a product to the user’s cart
 *
 * DELETE /api/cart?userId=...
 *   -> Clear the user’s entire cart
 */
export async function GET(request: Request) {
  // Parse userId from query param
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "Missing userId" }, { status: 400 });
  }

  const dbData = await readCartDb();
  // Find the user’s cart
  const user = dbData.users.find((u: any) => u.userId === userId);

  if (!user) {
    // If not found, return an empty array or 404
    return NextResponse.json([], { status: 200 });
  }

  return NextResponse.json(user.cartItems, { status: 200 });
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "Missing userId" }, { status: 400 });
  }

  const { _id, name, price, quantity, images, description, brand } =
    await request.json();

  const dbData = await readCartDb();
  let user = dbData.users.find((u: any) => u.userId === userId);

  // If user not found, add them
  if (!user) {
    user = {
      userId,
      cartItems: [],
    };
    dbData.users.push(user);
  }

  const existingItem = user.cartItems.find((item: any) => item._id === _id);

  if (existingItem) {
    // Increment the cartQuantity
    existingItem.cartQuantity += 1;
  } else {
    // Add new item with cartQuantity=1
    user.cartItems.push({
      _id,
      name,
      price,
      quantity,
      images,
      description,
      brand,
      cartQuantity: 1,
    });
  }

  // Save
  await writeCartDb(dbData);

  return NextResponse.json(
    { message: "Item added or incremented" },
    { status: 201 }
  );
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "Missing userId" }, { status: 400 });
  }

  const dbData = await readCartDb();
  const userIndex = dbData.users.findIndex((u: any) => u.userId === userId);

  if (userIndex === -1) {
    // No user found, nothing to clear
    return NextResponse.json(
      { message: "Cart already empty" },
      { status: 200 }
    );
  }

  // Clear the cart
  dbData.users[userIndex].cartItems = [];
  await writeCartDb(dbData);

  return NextResponse.json({ message: "User cart emptied" }, { status: 200 });
}
