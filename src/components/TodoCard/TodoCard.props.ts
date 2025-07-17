export interface TodoCardProps {
  children: string;
  id: number;
  isDone: boolean;
  fetchAllTodos: () => Promise<void>;
}
