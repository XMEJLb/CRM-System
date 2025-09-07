import type { Todo } from '@/types/types'
import { List } from 'antd'
import { TodoCard } from '@components/TodoCard/TodoCard'

interface TodoListProps {
  arrOfTodos: Todo[]
  updateTodos: () => Promise<void>
}

export const TodoList = ({ arrOfTodos, updateTodos }: TodoListProps) => {
  return (
    <List
      split
      bordered={false}
      itemLayout="horizontal"
      dataSource={arrOfTodos}
      locale={{ emptyText: 'Нет задач' }}
      renderItem={(item, index) => (
        <List.Item key={item.id ?? index} style={{ paddingInline: 0 }}>
          <TodoCard todo={item} updateTodos={updateTodos} />
        </List.Item>
      )}
    />
  )
}
