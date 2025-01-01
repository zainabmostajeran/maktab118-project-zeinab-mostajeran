import { NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";

const cartDbPath = path.join(process.cwd(), "data", "cartDb.json");

async function readCartDb() {
  try {
    const data = await fsPromises.readFile(cartDbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading cartDb.json:", error);
    return { users: [] };
  }
}

async function writeCartDb(data: any) {
  try {
    await fsPromises.writeFile(cartDbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing cartDb.json:", error);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "Missing userId" }, { status: 400 });
  }

  const dbData = await readCartDb();
  const user = dbData.users.find((u: any) => u.userId === userId);

  if (!user) {
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

  if (!user) {
    user = {
      userId,
      cartItems: [],
    };
    dbData.users.push(user);
  }

  const existingItem = user.cartItems.find((item: any) => item._id === _id);

  if (existingItem) {
    existingItem.cartQuantity += 1;
  } else {
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
    return NextResponse.json(
      { message: "Cart already empty" },
      { status: 200 }
    );
  }

  dbData.users[userIndex].cartItems = [];
  await writeCartDb(dbData);

  return NextResponse.json({ message: "User cart emptied" }, { status: 200 });
}
