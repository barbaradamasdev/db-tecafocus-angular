import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempoDeFilme',
  standalone: true
})
export class TempoDeFilmePipe implements PipeTransform {

  transform(minutos: string): string {
    const minutosComoNumero: number = parseInt(minutos.match(/\d+/)?.[0] || '0', 10);

    const horas: number = Math.floor(minutosComoNumero / 60);
    const minutosRestantes: number = minutosComoNumero % 60;

    const horasFormatadas = horas > 0 ? `${horas}h` : '';
    const minutosFormatados = minutosRestantes > 0 ? `${minutosRestantes}min` : '';

    const resposta = `${horasFormatadas} ${minutosFormatados}`;

    return resposta;
  }

}
