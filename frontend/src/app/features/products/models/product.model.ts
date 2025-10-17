export interface Product {
  id?: number;
  sku?: string; // Nova coluna
  name: string;
  description: string;
  unit?: string; // Nova coluna
  price: number;
  stock: number; // Será o "Estoque Total"
  minStockLevel?: number; // Adicionado para lógica de estoque
  maxStockLevel?: number; // Adicionado para lógica de estoque
  imageUrl?: string; // Adicionado para a miniatura
  category?: string; // Nova coluna
  status?: string; // Nova coluna (Ativo/Inativo)
  totalStock: number; // Pode ser igual a 'stock' ou uma nova propriedade
  availableStock: number; // Nova coluna
  reservedStock: number; // Nova coluna
  activeLocations: number; // Nova coluna
  nextDueDate?: string | null; // Nova coluna (string para data ISO ou Date)
}