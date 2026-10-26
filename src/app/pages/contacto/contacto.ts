
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacto.html'
})
export class Contacto {
  readonly mensajeEstado = signal('');

  formulario = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  };

  enviarMensaje(): void {
    const nombre = this.formulario.nombre.trim();
    const correo = this.formulario.correo.trim();
    const asunto = this.formulario.asunto.trim();
    const mensaje = this.formulario.mensaje.trim();

    if (!nombre || !correo || !asunto || !mensaje) {
      this.mensajeEstado.set('Completa todos los campos.');
      return;
    }

    const correoDestino = 'contacto@ventanova.cl';

    const cuerpo = [
      `Nombre: ${nombre}`,
      `Correo: ${correo}`,
      '',
      mensaje
    ].join('\n');

    const url = `mailto:${correoDestino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

    window.location.href = url;
    this.mensajeEstado.set(
      'Se ha preparado el mensaje. Envíalo desde tu aplicación de correo.'
    );
  }
}