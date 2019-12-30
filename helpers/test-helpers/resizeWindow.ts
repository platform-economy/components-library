export const resizeWindow = (x?:number, y?:number) => {
  if (x) {
    // tslint:disable-next-line: no-any
    (window as any).innerWidth = x;
  }
  if (y) {
    // tslint:disable-next-line: no-any
    (window as any).innerHeight = y;
  }
  window.dispatchEvent(new Event('resize'));
};
