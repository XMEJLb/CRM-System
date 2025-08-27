import type { Filter, Todo } from '@/types/types';
import { List } from 'antd';
import { TodoCard } from '@components/TodoCard/TodoCard';

interface TodoListProps {
  arrOfTodos: Todo[];
  arrFilter: Filter;
  updateTodos: () => Promise<void>;
}

export const TodoList = ({
  arrOfTodos,
  arrFilter,
  updateTodos,
}: TodoListProps) => {
  let filtered = arrOfTodos;

  if (arrFilter === 'inWork') {
    filtered = arrOfTodos.filter((t) => !t.isDone);
  } else if (arrFilter === 'completed') {
    filtered = arrOfTodos.filter((t) => t.isDone);
  }

  return (
    <List
      split
      bordered={false}
      itemLayout="horizontal"
      dataSource={filtered}
      rowKey={(item) => String(item.id)}
      locale={{ emptyText: 'Нет задач' }}
      renderItem={(item) => (
        <List.Item style={{ paddingInline: 0 }}>
          <TodoCard todo={item} updateTodos={updateTodos} />
        </List.Item>
      )}
    />
  );
};
