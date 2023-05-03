import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  constructor(statusCode, message) {
    super(`The server responded with a code of ${statusCode}.
    ${message}`);
  }
}

async function handleServerResponse(res) {
  if (!res.ok) {
    let message = 'Something went wrong, please try again later';
    if (res.status >= 400 && res.status < 500) {
      message = await res.json();
    }

    toast.error(message);
    throw new ApiError(res.status, message);
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

    if (options.accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${options.accessToken}`,
      };

      delete options.accessToken;
    }

    return fetch(`${apiUrl}/${endpoint}${segment}${search}`, options).then(
      handleServerResponse
    );
  }

  function create(body, options = {}) {
    options.headers = {
      ...headers,
      ...options.headers,
    };
    if (options.accessToken) {
      options.headers.Authorization = `Bearer ${options.accessToken}`;

      delete options.accessToken;
    }

    return fetch(`${apiUrl}/${endpoint}`, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }).then(handleServerResponse);
  }

  function update(id, body, options = {}) {
    options.headers = {
      ...headers,
      ...options.headers,
    };
    if (options.accessToken) {
      options.headers.Authorization = `Bearer ${options.accessToken}`;

      delete options.accessToken;
    }

    return fetch(`${apiUrl}/${endpoint}/${id}`, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }).then(handleServerResponse);
  }

  function remove(id, options = {}) {
    options.headers = {
      ...options.headers,
    };
    if (options.accessToken) {
      options.headers.Authorization = `Bearer ${options.accessToken}`;

      delete options.accessToken;
    }

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
