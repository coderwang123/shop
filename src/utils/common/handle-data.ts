export function recurseTrimChildListKey(oldKey: string, newKey: string, list: any[]) {
  function trim(oldKey: string, newKey: string, list: any[]) {
    list.forEach((item) => {
      if (item[oldKey]) {
        item[newKey] = item[oldKey];
        delete item[oldKey];
      }
      if (item[newKey] && item[newKey].length > 0) {
        trim(oldKey, newKey, item[newKey]);
      }
    });
  }
  trim(oldKey, newKey, list);
  return list;
}
export function getArrByFindKey(
  idArr: any[],
  list: any[],
  findKey: string,
  findListKey: string,
  returnKey: string
) {
  const newList: any[] = [];
  function recursive(id: number | string, list: any[]) {
    for (const listElement of list) {
      if (id == listElement[findKey]) {
        newList.push(listElement[returnKey]);
        break;
      } else {
        if (listElement[findListKey] && listElement[findListKey].length > 0) {
          recursive(id, listElement[findListKey]);
        }
      }
    }
  }
  idArr.forEach((id: number | string) => {
    recursive(id, list);
  });

  return newList;
}
