export async function deleteTask(id: number) {
  const response = await fetch('/api/todo/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });
  console.log(response);
  return response;
}

export async function updateTask({
  id,
  title,
  description
}: {
  id: number;
  title: string;
  description: string;
}) {
  const response = await fetch('/api/todo/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, title, description })
  });
  console.log(response);

  return response;
}

export async function createTask({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  const response = await fetch('/api/todo/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description })
  });
  console.log(response);

  return response;
}

export async function fetchTodos() {
  const response = await fetch('/api/todo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data);

  return data;
}
