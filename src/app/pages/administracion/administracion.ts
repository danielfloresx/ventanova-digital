
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto';
import { Producto, CategoriaProducto } from '../../models/producto';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './administracion.html',
  styleUrl: './administracion.css'
})
export class Administracion {
  private readonly productoService = inject(ProductoService);

  readonly productos = this.productoService.productos;
  readonly cargando = this.productoService.cargando;
  readonly error = this.productoService.error;

  readonly mostrarFormulario = signal(false);
  readonly idEdicion = signal<number | null>(null);
  readonly mensaje = signal('');
  readonly guardando = signal(false);

  readonly categorias: { valor: CategoriaProducto; nombre: string }[] = [
    { valor: 'notebooks', nombre: 'Notebooks' },
    { valor: 'impresoras-y-scanners', nombre: 'Impresoras y Scanners' },
    { valor: 'audio', nombre: 'Audio' },
    { valor: 'videojuegos-y-consolas', nombre: 'Videojuegos y Consolas' },
    { valor: 'fotografia-y-video', nombre: 'Fotografía y Video' },
    { valor: 'perifericos-y-otros-accesorios', nombre: 'Periféricos y otros accesorios' },
    { valor: 'componentes-de-computador', nombre: 'Componentes de Computador' }
  ];

  formulario = this.formularioVacio();

  constructor() {
    this.productoService.cargarProductos();
  }

  private formularioVacio() {
    return {
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: 'notebooks' as CategoriaProducto,
      icono: '📦',
      destacado: false,
      imagen: ''
    };
  }

  recargarProductos(): void {
    this.mensaje.set('');
    this.productoService.cargarProductos();
  }

  nuevoProducto(): void {
    this.idEdicion.set(null);
    this.formulario = this.formularioVacio();
    this.mensaje.set('');
    this.mostrarFormulario.set(true);
  }

  editarProducto(producto: Producto): void {
    this.idEdicion.set(producto.id);

    this.formulario = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: Number(producto.precio),
      categoria: producto.categoria,
      icono: producto.icono || '📦',
      destacado: Boolean(producto.destacado),
      imagen: producto.imagen || ''
    };

    this.mensaje.set('');
    this.mostrarFormulario.set(true);
  }

  guardarProducto(): void {
    const nombre = this.formulario.nombre.trim();
    const descripcion = this.formulario.descripcion.trim();
    const precio = Number(this.formulario.precio);

    if (
      !nombre ||
      !descripcion ||
      !Number.isFinite(precio) ||
      precio < 0
    ) {
      this.mensaje.set('Completa los campos obligatorios con datos válidos.');
      return;
    }

    const datos = {
      ...this.formulario,
      nombre,
      descripcion,
      precio,
      imagen: this.formulario.imagen.trim() || undefined
    };

    this.guardando.set(true);
    this.mensaje.set('');

    const solicitud = this.idEdicion() === null
      ? this.productoService.agregar(datos)
      : this.productoService.actualizar(this.idEdicion()!, datos);

    solicitud.subscribe({
      next: () => {
        this.guardando.set(false);
        this.mensaje.set(
          this.idEdicion() === null
            ? 'Producto creado correctamente.'
            : 'Producto actualizado correctamente.'
        );
        this.mostrarFormulario.set(false);
        this.productoService.cargarProductos();
      },
      error: error => {
        console.error('Error al guardar producto:', error);
        this.guardando.set(false);
        this.mensaje.set(
          error?.error?.mensaje ||
          error?.error?.message ||
          'No fue posible guardar el producto. Revisa la API.'
        );
      }
    });
  }

  eliminarProducto(producto: Producto): void {
    const confirmado = confirm(
      `¿Estás seguro de eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`
    );

    if (!confirmado) return;

    this.productoService.eliminar(producto.id).subscribe({
      next: () => {
        this.mensaje.set(`Producto "${producto.nombre}" eliminado correctamente.`);
      },
      error: error => {
        console.error('Error al eliminar producto:', error);
        this.mensaje.set(
          error?.error?.mensaje ||
          error?.error?.message ||
          'No fue posible eliminar el producto.'
        );
      }
    });
  }

  cancelar(): void {
    this.mostrarFormulario.set(false);
    this.idEdicion.set(null);
    this.mensaje.set('');
  }

  formatoPrecio(precio: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(Number(precio));
  }

  nombreCategoria(slug: string): string {
    return this.categorias.find(categoria => categoria.valor === slug)?.nombre
      ?? 'Otros productos';
  }
}