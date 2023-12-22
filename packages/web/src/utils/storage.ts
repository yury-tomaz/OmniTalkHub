
export class Storage {
 static set(key: string, value: any) {
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (e) {
   console.error(`Error setting item in sessionStorage: ${e}`);
  }
 }

 static get<T>(key: string, defaultValue: T | null = null): T | null {
  try {
   const serializedValue = sessionStorage.getItem(key);
   if (serializedValue !== null) {
    return JSON.parse(serializedValue) as T;
   }
  } catch (error) {
   console.error(`Error getting item from sessionStorage: ${error}`);
  }
  return defaultValue;
 }

 static clear(key: string) {
  try {
			sessionStorage.removeItem(key);
		} catch (error) {
			console.error(`Erro ao remover o item do sessionStorage: ${error}`);
		}
 }
}