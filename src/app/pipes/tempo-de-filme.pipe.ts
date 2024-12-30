import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempoDeFilme',
  standalone: true
})
export class TempoDeFilmePipe implements PipeTransform {

  transform(minutos: string): string {
    if (!minutos || isNaN(parseInt(minutos.match(/\d+/)?.[0] || '', 10))) {
      return 'N/A';
    }

    const minutosComoNumero: number = parseInt(minutos.match(/\d+/)?.[0] || '0', 10);

    const horas: number = Math.floor(minutosComoNumero / 60);
    const minutosRestantes: number = minutosComoNumero % 60;

    const horasFormatadas = horas > 0 ? `${horas}h` : '';
    const minutosFormatados = minutosRestantes > 0 ? `${minutosRestantes}min` : '';

    const resposta = `${horasFormatadas} ${minutosFormatados}`.trim();

    return resposta || '0min';
  }

}
