// Importar el módulo de rutas de Angular
import { Routes } from '@angular/router';

// Configurar las rutas de la aplicación
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./pages/inicio/inicio').then(m => m.Inicio)
  },
  {
    path: 'catalogo',
    loadComponent: () =>
      import('./pages/catalogo/catalogo').then(m => m.Catalogo)
  },
  {
    path: 'catalogo/:categoria',
    loadComponent: () =>
      import('./pages/catalogo/catalogo').then(m => m.Catalogo)
  },
  {
    path: 'tendencias',
    loadComponent: () =>
      import('./pages/tendencias/tendencias').then(m => m.Tendencias)
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./pages/contacto/contacto').then(m => m.Contacto)
  },
  {
    path: 'administracion',
    loadComponent: () =>
      import('./pages/administracion/administracion').then(m => m.Administracion)
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];
