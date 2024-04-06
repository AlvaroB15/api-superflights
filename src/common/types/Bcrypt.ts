declare module 'bcrypt' {
  export function genSalt(numeroRondas: number): any;

  export function hash(password: string, salt: any): any;
}
