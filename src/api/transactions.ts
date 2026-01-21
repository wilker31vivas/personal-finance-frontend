const API_URL = "http://localhost:3000/api";
import type { Balance, Transaction, Category } from "../types/types";

export async function getTransactions(filters = {}): Promise<Transaction[]> {
  const params = new URLSearchParams(filters);
  const res = await fetch(`${API_URL}/transactions?${params}`);
  if (!res.ok) throw new Error("Error loading transactions");
  return res.json();
}

export async function getBalance(): Promise<Balance> {
  const res = await fetch(`${API_URL}/stats/monthly`);
  if (!res.ok) throw new Error("Error loading balance");
  return res.json();
}

export async function getYears(): Promise<number[]> {
  const res = await fetch(`${API_URL}/transactions/years`);
  if (!res.ok) throw new Error("Error fetching years");
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error("Error fetching categories");
  return res.json();
}
