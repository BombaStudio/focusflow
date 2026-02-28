"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { prisma } from "../lib/prisma";

async function getSession() {
  return await getServerSession(authOptions);
}

export async function getTodos() {
  const session = await getSession();
  const userId = (session?.user as any)?.id;
  if (!userId) return [];

  return prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function addTodo(text: string) {
  const session = await getSession();
  const userId = (session?.user as any)?.id;
  if (!userId) throw new Error("Unauthorized");

  return prisma.todo.create({
    data: {
      text,
      userId,
    }
  });
}

export async function completeTodo(id: string) {
  const session = await getSession();
  const userId = (session?.user as any)?.id;
  if (!userId) throw new Error("Unauthorized");

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== userId) throw new Error("Not authorized");

  return prisma.todo.update({
    where: { id },
    data: { completed: true },
  });
}

export async function deleteTodo(id: string) {
  const session = await getSession();
  const userId = (session?.user as any)?.id;
  if (!userId) throw new Error("Unauthorized");

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== userId) throw new Error("Not authorized");

  return prisma.todo.delete({
    where: { id },
  });
}

export async function saveWorkSession(mode: "focus" | "break", duration: number) {
  const session = await getSession();
  const userId = (session?.user as any)?.id;
  if (!userId) throw new Error("Unauthorized");

  return prisma.workSession.create({
    data: {
      mode,
      duration,
      userId,
    }
  });
}
