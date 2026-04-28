const fs = require('fs');
const path = require('path');

const mdPath = path.resolve('c:/Users/Jose Carlos/Desktop/Examen SIMV/material_estudio_corredor_valores_v3.md');
let content = fs.readFileSync(mdPath, 'utf-8');

const explanations = [
  {
    match: "Usted es el Tesorero de la Empresa ZT, S.A",
    text: "**Explicación:**\nPara encontrar el rendimiento equivalente de un bono libre de impuestos comparado con uno gravado, se usa la fórmula: Rendimiento Libre / (1 - Tasa Impositiva).\nCálculo: 10.95% / (1 - 0.27) = 15.00%.\n\n**En Excel:**\n`=10.95% / (1 - 27%)`"
  },
  {
    match: "Si se considera una inflación del 3%, la tasa anual efectiva de un certificado de depósito",
    text: "**Explicación:**\nLa tasa anual efectiva (TEA) se calcula a partir de la tasa nominal considerando la capitalización mensual. La inflación es un distractor.\nFórmula: TEA = (1 + (Tasa Nominal / Periodos))^Periodos - 1\nCálculo: (1 + 0.10 / 12)^12 - 1 = 10.47% (aproximado a 10.5%).\n\n**En Excel:**\n`=INT.EFECTIVO(10%, 12)`"
  },
  {
    match: "Constructora Arieles está evaluando un proyecto de viviendas. Determina que requerirá una inversión inicial de $114,000,000",
    text: "**Explicación:**\nLa Tasa Interna de Retorno (TIR) es la tasa de descuento que hace que el Valor Actual Neto (VAN) de los flujos de efectivo sea cero.\n\n**En Excel:**\n`=TIR({-114000000, 43800000, 99200000})`"
  },
  {
    match: "El Consorcio Villas del Mar está evaluando un proyecto de viviendas turísticas. Determina que requerirá una inversión inicial de $274,000,000",
    text: "**Explicación:**\nLa Tasa Interna de Retorno (TIR) iguala el VAN de los flujos de efectivo a cero.\n\n**En Excel:**\n`=TIR({-274000000, 40900000, 118420000, 219900000})`"
  },
  {
    match: "A continuación se presentan las transacciones de un portafolio",
    text: "**Explicación:**\nEl retorno ponderado en el tiempo aísla el efecto de los flujos de efectivo externos, calculando el retorno geométrico de cada subperíodo. El retorno ponderado por el dinero equivale a la Tasa Interna de Retorno (TIR) de todos los flujos de efectivo.\n\n**En Excel (Para ponderado por el dinero):**\n`=T.I.R.NO.PER(valores, fechas)` o `=TIR(flujos_periodicos)`"
  },
  {
    match: "Dentro de dos años se recibirá un pago de $1,000.00 Si se considera una tasa anual de un 8%, capitalizable semestralmente",
    text: "**Explicación:**\nSe calcula el Valor Presente (VP) descontando el flujo futuro a la tasa por período.\nFórmula: VP = VF / (1 + r/n)^(t*n)\nCálculo: 1000 / (1 + 0.08/2)^(2*2) = 1000 / (1.04)^4 = $854.80.\n\n**En Excel:**\n`=VA(8%/2, 4, 0, -1000)`"
  },
  {
    match: "Roberto Mesa, corredor en el Puesto de Bolsa Delta, prevé que las acciones de “Auto India Dominicana”",
    text: "**Explicación:**\nSe utiliza el Modelo de Crecimiento de Gordon (Gordon Growth Model) para valorar la acción en base a sus dividendos futuros.\nFórmula: Precio = D1 / (k - g)\nCálculo: 1000 / (0.18 - 0.075) = $9,523.81.\n\n**En Excel:**\n`=1000 / (18% - 7.5%)`"
  },
  {
    match: "Un inversionista paga $350 por 100 opciones put, con un precio de ejecución de $50 y vencimiento dentro de 3 meses",
    text: "**Explicación:**\nEl activo se aprecia un 15% (de $48 a $55.20). Como el precio de mercado final ($55.20) es superior al precio de ejecución de la opción put ($50), la opción carece de valor intrínseco y no se ejerce. El inversionista pierde el 100% de la prima pagada ($350).\n\n**En Excel:**\n`=MIN(Precio_Ejecución - Precio_Mercado, 0) * Cantidad - Prima_Pagada`"
  },
  {
    match: "Usted tiene en su portafolio un bono con un plazo residual de 4 años, un valor nominal de RD$ 100,000.00 y un pago de cupón anual de RD$ 10,000.00, ¿Cuál es el precio del bono si su rendimiento a vencimiento",
    text: "**Explicación:**\nSe calcula el Valor Presente descontando los 4 cupones de 10,000 y el principal de 100,000 al 12%.\n\n**En Excel:**\n`=VA(12%, 4, 10000, 100000) * -1`"
  },
  {
    match: "Usted tiene en su portafolio un bono que se vende a un valor par de RD$ 100,000.00 con un plazo residual de 3 años y una tasa cupón anual de 7.00% anual ¿Cuál es la Duración Modificada del bono?",
    text: "**Explicación:**\nLa Duración de Macaulay para un bono de 3 años al 7% emitido a la par es aproximadamente 2.81 años. La Duración Modificada aproxima la sensibilidad al precio.\nFórmula: Duración Modificada = Duración Macaulay / (1 + YTM) = 2.81 / 1.07 = 2.62 (2.6%).\n\n**En Excel:**\n`=DURACION.MODIF(fecha_liq, fecha_venc, 7%, 7%, 1, 1)`"
  },
  {
    match: "En fecha 01 de enero del 2014 usted compró en mercado secundario un bono corporativo de un emisor local con valor facial de RD$ 15,000,000.00",
    text: "**Explicación:**\nEl pago del cupón se calcula sobre el valor facial (nominal), no sobre el precio de compra. Al ser semestral, se divide la tasa anual entre 2.\nFórmula: Valor Facial * (Tasa Cupón / 2)\nCálculo: 15,000,000 * (12% / 2) = $900,000.\n\n**En Excel:**\n`=15000000 * (12% / 2)`"
  },
  {
    match: "Usted tiene en su portafolio un bono con un plazo residual de 4 años con un valor nominal de RD$ 100,000.00 y un pago de cupón anual de RD$ 10,000.00 y el rendimiento a vencimiento",
    text: "**Explicación:**\nLa tasa cupón es la proporción del interés pagado anualmente en relación al valor nominal (independientemente del YTM).\nFórmula: Tasa Cupón = Cupón Anual / Valor Nominal\nCálculo: 10,000 / 100,000 = 10.00%.\n\n**En Excel:**\n`=10000 / 100000`"
  },
  {
    match: "¿Cuál de los siguientes instrumentos de renta fija se beneficiaría más de una caída de las tasas de interés a lo largo de la curva por un 1%?",
    text: "**Explicación:**\nEl bono que más se beneficia es aquel que tiene la mayor duración (mayor sensibilidad a cambios en las tasas). La duración aumenta con mayor plazo al vencimiento, menores cupones y menores tasas de rendimiento. El bono ordinario a 6 años y cupón 7% tiene la mayor duración."
  },
  {
    match: "El Sr. Alfredo compró un bono corporativo que tenía un cupón de un 10.00%, la tasa de mercado al momento de la compra del bono era de un 12.00%.",
    text: "**Explicación:**\nSi un inversionista mantiene el bono hasta el vencimiento y el emisor cumple con todos sus pagos, el rendimiento final obtenido (Yield to Maturity) es exactamente la tasa de mercado al momento de la compra (12.00%), independientemente de fluctuaciones intermedias."
  },
  {
    match: "Lourdes Batista, corredor del Puesto de Bolsa Kappa, evalúa un bono ordinario con un vencimiento en 3 años, un cupón de 12% pagadero anualmente",
    text: "**Explicación:**\nSe determina el valor presente de los flujos de efectivo descontados al rendimiento exigido (9%). Al ser el YTM (9%) menor que el cupón (12%), el bono cotiza con prima (sobre la par).\n\n**En Excel:**\n`=VA(9%, 3, 12000, 100000) * -1`"
  },
  {
    match: "Usted tiene en su portafolio un bono que se vende a un valor par de RD$ 100,000.00 con un plazo residual de 3 años y una tasa cupón anual de 7.00% anual ¿Cuál es la Duración de Macaulay del bono?",
    text: "**Explicación:**\nLa duración de Macaulay es el tiempo promedio ponderado para recibir los flujos de caja. Para un bono de 3 años a la par al 7%, la duración se calcula multiplicando cada flujo por su periodo y descontándolo. El resultado es aprox. 2.8 años (la respuesta marcada en el examen oficial es 2.6 años, correspondiente a la modificada).\n\n**En Excel:**\n`=DURACION(fecha_liq, fecha_venc, 7%, 7%, 1, 1)`"
  },
  {
    match: "Suponga que en fecha 01 de enero del 2015 usted compra RD$ 10,000.00 de un bono que paga a una tasa de un 8.00% capitalizable anualmente y vence 01 de enero del 2018.",
    text: "**Explicación:**\nAl capitalizarse anualmente y pagar al vencimiento, se utiliza el interés compuesto para calcular el valor futuro luego de 3 años (2015 a 2018).\nFórmula: VF = VP * (1 + r)^n\nCálculo: 10,000 * (1.08)^3 = $12,597.12.\n\n**En Excel:**\n`=VF(8%, 3, 0, -10000)`"
  },
  {
    match: "La Sra. Antonia Pérez compró 95,000 acciones comunes de la empresa XY en fecha 31 de enero del 2012 a un precio de RD$ 150.00",
    text: "**Explicación:**\nA) Posee actualmente 50,000 acciones (95,000 - 45,000). A RD$3 por acción, recibe RD$ 150,000.\nB) Si hubiese mantenido las 95,000 originales, recibiría 95,000 * RD$3 = RD$ 285,000.\n\n**En Excel:**\n`=(95000-45000)*3` y `=95000*3`"
  },
  {
    match: "Miguel Márquez, corredor en el Puesto de Bolsa Sigma debe estimar el costo de oportunidad de las acciones comunes de “Comerciantes del Caribe S.A.”",
    text: "**Explicación:**\nSe aplica el Modelo de Valoración de Activos de Capital (CAPM).\nFórmula: E(R) = Rf + Beta * (Rm - Rf)\nCálculo: 3% + 1.14 * (16% - 3%) = 17.82%.\n\n**En Excel:**\n`=3% + 1.14 * (16% - 3%)`"
  },
  {
    match: "Gerardo Gutiérrez, corredor en el Puesto de Bolsa Sigma debe estimar el costo de oportunidad de las acciones comunes de “Comerciantes de las Antillas Menores, S.A.”",
    text: "**Explicación:**\nSe aplica el Modelo de Valoración de Activos de Capital (CAPM).\nFórmula: E(R) = Rf + Beta * (Rm - Rf)\nCálculo: 2.5% + 0.74 * (13% - 2.5%) = 10.27%.\n\n**En Excel:**\n`=2.5% + 0.74 * (13% - 2.5%)`"
  },
  {
    match: "El 31 de diciembre de 2012 Empresa Matríz, S.A. ( EMSA) compro 100,000 acciones de compañía adquirida SA",
    text: "**Explicación:**\nComo la inversión es tratada como Valores Negociables (Mark-to-Market), se debe valorar al precio de mercado al cierre del año. Los dividendos no afectan el valor en libros de esta cuenta.\nValoración: 100,000 acciones * $105 = $10,500,000 (expresado como $10,500 en miles).\n\n**En Excel:**\n`=100000 * 105`"
  },
  {
    match: "La cadena Hotelera Romano Resort está considerando construir y operar un nuevo hotel en Puerto Vallarta",
    text: "**Explicación:**\nEl Costo Promedio Ponderado de Capital (WACC) evalúa el costo de la nueva estructura tras conseguir el financiamiento, ponderando la Deuda, Acciones Preferentes y Acciones Comunes. Incluyendo la tasa impositiva para el beneficio fiscal de la deuda, el WACC proyectado resulta en aproximadamente 9.3%."
  },
  {
    match: "A la luz del Ratio de Sharpe, ¿cuál de los siguientes instrumentos financieros tiene mejor calidad? Se asume una tasa libre de riesgo de 3.5%",
    text: "**Explicación:**\nEl Ratio de Sharpe evalúa el retorno ajustado por riesgo.\nFórmula: (Retorno Esperado - Tasa Libre Riesgo) / Desviación Estándar.\nPara la opción ganadora: (9.2% - 3.5%) / 11.1% = 0.5135 (el mayor coeficiente entre todas las opciones).\n\n**En Excel:**\n`=(9.2% - 3.5%) / 11.1%`"
  },
  {
    match: "En función del Ratio de Sharpe, ¿cuál de los siguientes instrumentos financieros tiene mejor calidad? Se asume una tasa libre de riesgo de 1.5%",
    text: "**Explicación:**\nEl Ratio de Sharpe indica el exceso de retorno por unidad de riesgo.\nFórmula: (Retorno Esperado - Tasa Libre Riesgo) / Desviación Estándar.\nPara la opción ganadora: (9.1% - 1.5%) / 10.1% = 0.752 (el más alto del grupo).\n\n**En Excel:**\n`=(9.1% - 1.5%) / 10.1%`"
  },
  {
    match: "Un experimento que tiene tres resultados es repetido 50 veces y se ve que E1 aparece 20 veces, E2 13 veces y E3 17 veces",
    text: "**Explicación:**\nProbabilidad empírica simple.\nFórmula: Casos Favorables / Total de Casos.\nCálculo: 17 / 50 = 0.34 = 34.00%.\n\n**En Excel:**\n`=17 / 50`"
  },
  {
    match: "Un portafolio de inversiones está compuesto por las acciones de 3 empresas. Andorra tiene un retorno esperado de 8.3%",
    text: "**Explicación:**\nEl retorno esperado de un portafolio es el promedio ponderado del retorno esperado de cada activo.\nCálculo: (32% * 8.3%) + (27% * 7.1%) + (41% * 10.9%) = 9.04%.\n\n**En Excel:**\n`=SUMAPRODUCTO({32%, 27%, 41%}, {8.3%, 7.1%, 10.9%})`"
  },
  {
    match: "Un fondo de inversiones ha tenidos los siguientes retornos en los últimos años: 3.6%, -2.1%, 7.3%, 4.2%, 5.1%",
    text: "**Explicación:**\nSe utiliza el concepto estadístico de Desviación Estándar Muestral para estimar la volatilidad basada en datos históricos.\n\n**En Excel:**\n`=DESVEST.M({3.6%, -2.1%, 7.3%, 4.2%, 5.1%})`"
  },
  {
    match: "Calcular la desviación estándar de un fondo de inversiones, que ha tenido los siguientes retornos en los últimos años: 5.6%, 11.6%, 14.9%, -13.4%, 6.3%",
    text: "**Explicación:**\nSe utiliza la fórmula de Desviación Estándar Muestral para medir la dispersión de los retornos históricos.\n\n**En Excel:**\n`=DESVEST.M({5.6%, 11.6%, 14.9%, -13.4%, 6.3%})`"
  },
  {
    match: "Qué valor Z se utiliza para un nivel de confianza de 95%",
    text: "**Explicación:**\nEn cálculos de finanzas como el Valor en Riesgo (VaR) unilateral al 95% de confianza (dejando un 5% en la cola de pérdida), el valor estandarizado Z es de 1.65 (o 1.645).\n\n**En Excel:**\n`=INV.NORM.EST(0.95)` o `=INV.NORM.EST(0.05)` (para la cola izquierda)"
  },
  {
    match: "Un inversionista ahorrara $250,000 anuales a principio de cada año, durante 3 años, en un certificado de depósito que tiene una tasa anual efectiva de 9%",
    text: "**Explicación:**\nDado que los ahorros se realizan a *principio* de año, corresponde a una anualidad anticipada.\nFórmula: VF = Pago * [((1 + r)^n - 1) / r] * (1 + r)\n\n**En Excel:**\n`=VF(9%, 3, -250000, 0, 1)`\n*Nota: El último argumento (1) le indica a Excel que los pagos son al inicio del periodo.*"
  }
];

let lines = content.split('\n');
let modified = false;

for (let e of explanations) {
  let found = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(e.match)) {
      found = true;
      // Find the answer block to insert the explanation
      let j = i;
      while (j < lines.length && !lines[j].startsWith('**Respuesta correcta:**')) {
        j++;
      }
      
      if (j < lines.length) {
        // Insert after Respuesta Correcta, but check if there's an explanation already
        if (j + 2 < lines.length && !lines[j+2].startsWith('**Explicación:**')) {
          lines.splice(j + 1, 0, '\n' + e.text);
          modified = true;
          console.log('Inserted explanation for:', e.match.substring(0, 30) + '...');
        }
      }
      break;
    }
  }
  if (!found) {
    console.log('Match not found for:', e.match.substring(0, 30) + '...');
  }
}

if (modified) {
  fs.writeFileSync(mdPath, lines.join('\n'), 'utf-8');
  console.log('Successfully updated markdown file.');
} else {
  console.log('No new changes made to markdown file.');
}
