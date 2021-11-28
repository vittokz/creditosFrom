export class Pago {
  idPago?: string;
  idCliente?: string;
  idCredito?: string;
  tipoPago?: string;
  numCuota?: number;
  valorPago?: string;
  valorCuota?: string;
  abonoCapital?: number;
  abonoInteres?: number;
  abonoInteresMora?: number;
  abonoCapitalAmortizacion?: number;
  abonoInteresAmortizacion?: number;
  saldoInicial?: number;
  saldoFinal?: number;
  fechaPago?: string;
  fechaRegistro?: string;
  estado: string;
  usuarioRegistro?: string;
}
