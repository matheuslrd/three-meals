export default async function requestApi(url) {
  const request = await fetch(url);
  const resolve = await request.json();
  return resolve;
}
