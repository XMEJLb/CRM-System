export interface AddTodoProps {
  arrOfTodos: { id: number; text: string; finished: boolean }[];
  setArrOfTodos: React.Dispatch<
    React.SetStateAction<{ id: number; text: string; finished: boolean }[]>
  >;
}
