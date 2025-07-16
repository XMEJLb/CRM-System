export interface TodoCardProps {
  children: string;
  handleDelete: (id: number) => void;
  id: number;
  finished: boolean;
  setArrOfTodos: React.Dispatch<
    React.SetStateAction<{ id: number; text: string; finished: boolean }[]>
  >;
  arrOfTodos: { id: number; text: string; finished: boolean }[];
}
