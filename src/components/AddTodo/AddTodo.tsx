import { postNewTodo } from '@/api/api'
import { Button, Form, Input, message } from 'antd'
import { MAX_TODO_LENGTH, MIN_TODO_LENGTH } from '@/constants'

interface AddTodoProps {
  updateTodosInfo: () => Promise<void>
}

export const AddTodo = ({ updateTodosInfo }: AddTodoProps) => {
  const [form] = Form.useForm<{ todo: string }>()

  const onFinish = async (values: { todo: string }) => {
    try {
      await postNewTodo(values.todo.trim())
      await updateTodosInfo()
      form.resetFields()
    } catch (error) {
      message.error(`Возникла ошибка: ${(error as Error).message}`)
    }
  }

  return (
    <Form
      form={form}
      name="add-todo"
      layout="inline"
      onFinish={onFinish}
      autoComplete="off"
      validateTrigger="onSubmit"
    >
      <Form.Item<{ todo: string }>
        name="todo"
        rules={[
          { required: true, whitespace: true, message: 'Введите текст' },
          {
            min: MIN_TODO_LENGTH,
            transform: (v) => v?.trim(),
            message: `Минимум ${MIN_TODO_LENGTH} символа`,
          },
          {
            max: MAX_TODO_LENGTH,
            transform: (v) => v?.trim(),
            message: `Максимум ${MAX_TODO_LENGTH} символа`,
          },
        ]}
      >
        <Input allowClear style={{ width: 360 }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  )
}
