"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { prisma } from "../lib/prisma";

async function getSession() {
  return await getServerSession(authOptions);
}

export async function getTodos() {
  const session = await getSession();
  if (!(session?.user as any)?.id && !session?.user?.email) return [];

  // Wait, the id might be exposed or we can query by email
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" }
  });

  if (!user) return [];

  return prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function addTodo(text: string) {
  const session = await getSession();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) throw new Error("User not found");

  return prisma.todo.create({
    data: {
      text,
      userId: user.id,
    }
  });
}

export async function completeTodo(id: string) {
  const session = await getSession();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) throw new Error("User not found");

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== user.id) throw new Error("Not authorized");

  return prisma.todo.update({
    where: { id },
    data: { completed: true },
  });
}

export async function deleteTodo(id: string) {
  const session = await getSession();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) throw new Error("User not found");

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== user.id) throw new Error("Not authorized");

  return prisma.todo.delete({
    where: { id },
  });
}
