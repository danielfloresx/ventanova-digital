
export type CategoriaProducto =
  | 'notebooks'
  | 'impresoras-y-scanners'
  | 'audio'
  | 'videojuegos-y-consolas'
  | 'fotografia-y-video'
  | 'perifericos-y-otros-accesorios'
  | 'componentes-de-computador';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: CategoriaProducto;
  icono: string;
  destacado: boolean;
  imagen?: string;
}
