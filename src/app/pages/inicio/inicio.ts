
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {
  private readonly productoService = inject(ProductoService);

  // Estado de carga y errores de la API
  readonly cargando = this.productoService.cargando;
  readonly error = this.productoService.error;

  // Obtiene los productos destacados desde MySQL
  readonly productosDestacados = computed(() =>
    [...this.productoService.destacados()]
      .sort((a, b) => b.id - a.id)
      .slice(0, 4)
  );

  constructor() {
    // Carga los productos al entrar en Inicio
    this.productoService.cargarProductos();
  }

  // Formatea los precios en pesos chilenos
  formatoPrecio(precio: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(precio);
  }
}
