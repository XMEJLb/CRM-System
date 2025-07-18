export interface TodoListProps {
  arrOfTodos: {
    id: number;
    title: string;
    created: string;
    isDone: boolean;
  }[];
  arrFilter: 'all' | 'inWork' | 'completed';
  fetchAllTodos: () => Promise<void>;
}
