import { useState, useEffect } from 'react';
import { Checkbox, Form, Input, Button, Space, message } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { deleteTodo, putTodoIsDone, putTodoTitle } from '@/api/api';
import type { Todo } from '@/types/types';
import { MIN_TODO_LENGTH, MAX_TODO_LENGTH } from '@/constants';

interface TodoCardProps {
  todo: Todo;
  updateTodos: () => Promise<void>;
}

export const TodoCard = ({ todo, updateTodos }: TodoCardProps) => {
  const { id, title, isDone } = todo;

  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm<{ title: string }>();

  useEffect(() => {
    form.setFieldsValue({ title });
  }, [title, form]);

  const onToggleDone = async (checked: boolean) => {
    try {
      await putTodoIsDone(checked, id);
      await updateTodos();
    } catch (e) {
      message.error(`Не удалось изменить статус: ${(e as Error).message}`);
    }
  };

  const onDelete = async () => {
    try {
      await deleteTodo(id);
      await updateTodos();
      message.success('Задача удалена');
    } catch (e) {
      message.error(`Не удалось удалить: ${(e as Error).message}`);
    }
  };

  const startEdit = () => {
    form.setFieldsValue({ title });
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    form.resetFields();
  };

  const onFinish = async ({ title }: { title: string }) => {
    const value = title.trim();
    try {
      await putTodoTitle(value, id);
      await updateTodos();
      setEditing(false);
      message.success('Задача обновлена');
    } catch (e) {
      message.error(`Не удалось обновить: ${(e as Error).message}`);
    }
  };

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Checkbox
        checked={isDone}
        onChange={(e) => onToggleDone(e.target.checked)}
      />

      <Form
        form={form}
        layout="inline"
        style={{ flex: 1 }}
        onFinish={onFinish}
        initialValues={{ title }}
        validateTrigger="onSubmit"
      >
        <Form.Item
          name="title"
          style={{ flex: 1 }}
          rules={[
            { required: true, whitespace: true, message: 'Введите текст' },
            {
              min: MIN_TODO_LENGTH,
              transform: (v) => v?.trim(),
              message: `Минимум ${MIN_TODO_LENGTH} символов`,
            },
            {
              max: MAX_TODO_LENGTH,
              transform: (v) => v?.trim(),
              message: `Максимум ${MAX_TODO_LENGTH} символов`,
            },
          ]}
        >
          <Input
            style={{
              height: 15,
              width: 350,
              color: 'black',
              textDecoration: isDone ? 'line-through' : undefined,
            }}
            disabled={!editing}
            variant="borderless"
          />
        </Form.Item>
        <Space>
          {editing && (
            <Space style={{ flex: 1, gap: 0.5 }}>
              <Button
                type="primary"
                htmlType="submit"
                icon={<CheckOutlined />}
                aria-label="Сохранить"
              />
              <Button
                type="default"
                onClick={cancelEdit}
                icon={<CloseOutlined />}
                aria-label="Отменить"
              />
            </Space>
          )}

          {!editing && (
            <Space style={{ flex: 1, gap: 0 }}>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={startEdit}
                aria-label="Редактировать"
              />
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                aria-label="Удалить"
                onClick={onDelete}
              />
            </Space>
          )}
        </Space>
      </Form>
    </div>
  );
};
