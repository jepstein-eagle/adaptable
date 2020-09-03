export interface Cancelable {
  cancel(): void;
  flush(): void;
}
