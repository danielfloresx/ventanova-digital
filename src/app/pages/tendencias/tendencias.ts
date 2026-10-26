
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-tendencias',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tendencias.html'
})
export class Tendencias {
  private readonly productoService = inject(ProductoService);

  readonly cargando = this.productoService.cargando;
  readonly error = this.productoService.error;

  readonly productosTendencia = computed(() =>
    [...this.productoService.productos()]
      .sort((a, b) => b.id - a.id)
      .slice(0, 8)
  );

  constructor() {
    this.productoService.cargarProductos();
  }

  formatoPrecio(precio: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(Number(precio));
  }
}
