export enum ERespuestasMensajes {
  ERROR_ACCESO = "Error de acceso, datos incorrectos!!!",
  OK_ACCESO = "Acceso correcto.",
  OK = "Se registró correctamente",
  OK_CREDITO_NUEVO = "Se registró correctamente el estado y el nuevo crédito",
  OK_CREDITO_ACEPTADO = "Se acepto condiciones del crédito, puede acceder mediente el menú créditos!!!",
  ERROR_DE_REGISTRO = "Existen datos incorrectos",
  OK__ACTUALIZADO = "Se actualizo correctamente",
  ERROR__ACTUALIZADO = "Error al actualizar información",
  OK_PAGO_NUEVO = "Se registró correctamente el pago",
  ERROR_PAGO_CUOTA_NORMAL = "El pago excede la cuota normal, debe aplicarse a proximas cuotas",
  ERROR_PAGO_CPROXIMAS_CUOTAS = "Para realizar pago a proximas cuotas el valor abonado debe ser mayor al de la cuota!!",
  ERROR_PAGO_INTERES_COMUN = "Proximas cuotas no esta habilitado para pago de créditos con interés común!!",
  OK_EMAIL = "Se envío acceso al sistema a su emáil",

  ERROR_PAGO_CAPITAL = "El pago a capital debe ser mayor a 2 cuota",
}

export enum ERespuestasSwat {
  SUCCESS = "success",
  INFO = "info",
  DANGER = "error",
}
