const apiUrl = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  constructor(statusCode, message) {
    super(`The server responded with a code of ${statusCode}.
    ${message}`);
  }
}

function handleServerResponse(res) {
  if (!res.ok) {
    throw new ApiError(res.status);
  }
  return res.json();
}

const headers = {
  'Content-type': 'application/json',
};

export function configureApi(endpoint) {
  function retrieve(id, search = '', options = {}) {
    if (search) {
      search = `?${search}`;
    }
    let segment = '';
    if (id) {
      segment = `/${id}`;
    }
    return fetch(`${apiUrl}/${endpoint}${segment}${search}`, options).then(
      handleServerResponse
    );
  }

  function create(body, options = {}) {
    return fetch(`${apiUrl}/${endpoint}`, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        ...headers,
        ...options.headers,
      },
    }).then(handleServerResponse);
  }

  function update(id, body, options = {}) {
    return fetch(`${apiUrl}/${endpoint}/${id}`, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        ...headers,
        ...options.headers,
      },
    }).then(handleServerResponse);
  }

  function remove(id, options = {}) {
    return fetch(`${apiUrl}/${endpoint}/${id}`, {
      ...options,
      method: 'DELETE',
    }).then(handleServerResponse);
  }

  return {
    create,
    retrieve,
    update,
    remove,
  };
}
