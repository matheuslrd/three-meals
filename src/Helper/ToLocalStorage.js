export default function ToLocalStorage(key1, content1, key2, content2) {
  localStorage.setItem(key1, JSON.stringify(content1));
  if (key2) {
    localStorage.setItem(key2, JSON.stringify(content2));
  }
}
// envia 1(UM) ou 2(DOIS) itens para localStorage
