const API_URL = "http://localhost:3000/api";
import type {
  Balance,
  Transaction,
  Category,
  DataOptions
} from "../types/types";

export async function getTransactions(filters = {}): Promise<Transaction[]> {
  const params = new URLSearchParams(filters);
  const res = await fetch(`${API_URL}/transactions?${params}`);
  if (!res.ok) throw new Error("Error loading transactions");
  return res.json();
}

export async function getBalance(filters = {}): Promise<Balance> {
  const params = new URLSearchParams(filters);
  const res = await fetch(`${API_URL}/stats/monthly?${params}`);
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

export async function getTopCategories(filters = {}): Promise<DataOptions[]> {
  const params = new URLSearchParams(filters);
  const res = await fetch(`${API_URL}/stats/top-categories?${params}`);
  if (!res.ok) throw new Error("Error fetching categories");
  return res.json();
}

export async function getAllCategories(filters = {}): Promise<DataOptions[]> {
  const params = new URLSearchParams(filters);
  const res = await fetch(`${API_URL}/stats/by-category?${params}`);
  if (!res.ok) throw new Error("Error fetching categories");
  return res.json();
}
