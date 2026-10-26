//Importar componentes y módulos necesarios de Angular

import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo {
  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);

  // Categoría seleccionada desde la navegación
  categoria = signal('todos');

  // Texto ingresado en el buscador
  busqueda = signal('');

  // Estados de carga de la API
  cargando = this.productoService.cargando;
  errorCarga = this.productoService.error;

  // Categorías disponibles en el catálogo
  categorias = [
    { nombre: 'Todos los productos', slug: 'todos' },
    { nombre: 'Notebooks', slug: 'notebooks' },
    { nombre: 'Impresoras y Scanners', slug: 'impresoras-y-scanners' },
    { nombre: 'Audio', slug: 'audio' },
    { nombre: 'Videojuegos y Consolas', slug: 'videojuegos-y-consolas' },
    { nombre: 'Fotografía y Video', slug: 'fotografia-y-video' },
    { nombre: 'Periféricos y otros accesorios', slug: 'perifericos-y-otros-accesorios' },
    { nombre: 'Componentes de Computador', slug: 'componentes-de-computador' }
  ];

  constructor() {
    // Carga los productos desde MySQL
    this.productoService.cargarProductos();

    // Sincroniza el filtro con la URL
    this.route.paramMap.subscribe(params => {
      this.categoria.set(params.get('categoria') ?? 'todos');
    });
  }

  // Filtra por categoría y texto de búsqueda
  productosFiltrados = computed(() => {
    const categoriaActual = this.categoria();
    const texto = this.busqueda().trim().toLowerCase();

    return this.productoService.productos().filter(producto => {
      const coincideCategoria =
        categoriaActual === 'todos' ||
        producto.categoria === categoriaActual;

      const coincideBusqueda =
        producto.nombre.toLowerCase().includes(texto) ||
        producto.descripcion.toLowerCase().includes(texto);

      return coincideCategoria && coincideBusqueda;
    });
  });

  // Formatea el precio en pesos chilenos
  formatoPrecio(precio: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(precio);
  }

  // Cambia el filtro de categoría
  cambiarCategoria(slug: string): void {
    this.categoria.set(slug);
  }

  // Obtiene el nombre visible de una categoría
  nombreCategoria(slug: string): string {
    return this.categorias.find(item => item.slug === slug)?.nombre
      ?? 'Otros productos';
  }
}