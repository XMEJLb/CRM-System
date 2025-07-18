export const fetchAllTodos = async (
  setArr: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        title: string;
        created: string;
        isDone: boolean;
      }[]
    >
  >,
  setInfo: React.Dispatch<
    React.SetStateAction<{
      all: number;
      completed: number;
      inWork: number;
    }>
  >
) => {
  try {
    const response = await fetch(
      'https://easydev.club/api/v1/todos?filter=all'
    );
    const { data, info } = await response.json();
    console.log([...data].reverse());

    setArr([...data].reverse());
    setInfo(info);
  } catch (error) {
    console.error(error);
  }
};

export const postNewTodo = async (title: string) => {
  try {
    await fetch('https://easydev.club/api/v1/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        isDone: false,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (id: number) => {
  try {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
  }
};

export const putTodoTitle = async (title: string, id: number) => {
  try {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: title,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export const putTodoIsDone = async (isDone: boolean, id: number) => {
  try {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        isDone: !isDone,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};
