// Usually there's a library to generate id e.g. uuid

let currentId = 0;

export function generateId(): number {
  return ++currentId;
}

export function resetId(): void {
  currentId = 0;
}
