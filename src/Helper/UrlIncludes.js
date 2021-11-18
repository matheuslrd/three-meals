export default function UrlIncludes(url, path, ifTrue, ifFalse) {
  return url.includes(path) ? ifTrue : ifFalse;
}
