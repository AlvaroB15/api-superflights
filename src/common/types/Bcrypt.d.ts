declare module 'bcrypt' {
  export function genSalt(numeroRondas: number): any;

  export function hash(password: string, salt: any): any;

  export function compare(password: string, hash: string): Promise<boolean>;
}
