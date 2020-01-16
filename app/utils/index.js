export async function fetchData({ method = 'GET', path = '', config, body = {} }) {
  const response = await fetch(`${config.cartApi}${path}`, {
    method,
    body: JSON.stringify(body),
  });

  if (response.ok) {
    return response.json();
  }
  return null;
}
