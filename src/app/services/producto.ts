
import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/productos';

  private readonly productosState = signal<Producto[]>([]);
  private readonly cargandoState = signal(false);
  private readonly errorState = signal<string | null>(null);

  readonly productos = this.productosState.asReadonly();
  readonly cargando = this.cargandoState.asReadonly();
  readonly error = this.errorState.asReadonly();

  readonly destacados = computed(() =>
    this.productosState().filter(producto => producto.destacado)
  );

  cargarProductos(): void {
    this.cargandoState.set(true);
    this.errorState.set(null);

    this.http.get<Producto[]>(this.apiUrl).subscribe({
      next: productos => {
        this.productosState.set(
          productos.map(producto => ({
            ...producto,
            precio: Number(producto.precio),
            destacado: Boolean(Number(producto.destacado))
          }))
        );
        this.cargandoState.set(false);
      },
      error: error => {
        console.error('Error al cargar productos:', error);
        this.errorState.set('No fue posible cargar los productos.');
        this.cargandoState.set(false);
      }
    });
  }

  agregar(producto: Omit<Producto, 'id'>): Observable<Producto> {
    this.errorState.set(null);

    return this.http.post<Producto>(this.apiUrl, producto).pipe(
      tap(nuevo => {
        this.productosState.update(actuales => [
          ...actuales,
          {
            ...nuevo,
            precio: Number(nuevo.precio),
            destacado: Boolean(Number(nuevo.destacado))
          }
        ]);
      })
    );
  }

  actualizar(
    id: number,
    cambios: Partial<Omit<Producto, 'id'>>
  ): Observable<Producto> {
    this.errorState.set(null);

    return this.http.put<Producto>(
      `${this.apiUrl}/${id}`,
      cambios
    ).pipe(
      tap(actualizado => {
        this.productosState.update(actuales =>
          actuales.map(producto =>
            producto.id === id
              ? {
                  ...actualizado,
                  precio: Number(actualizado.precio),
                  destacado: Boolean(Number(actualizado.destacado))
                }
              : producto
          )
        );
      })
    );
  }

  eliminar(id: number): Observable<void> {
    this.errorState.set(null);

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.productosState.update(actuales =>
          actuales.filter(producto => producto.id !== id)
        );
      })
    );
  }
}