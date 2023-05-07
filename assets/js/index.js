async function obtenerDatos (tipoCambio) {
    try {
        const datos = await fetch(`https://mindicador.cl/api/${tipoCambio}`);
        const jsonData = await datos.json();
        return jsonData;
}   catch (e) {
        console.log(e);
        alert(e.message); 
    }
}

const boton = document.querySelector('#btn');

boton.addEventListener ('click', async () => {

    const conversor =  async () => {
        const montoClp = Number(document.querySelector("#clpInput").value);
        const selectConvert = document.querySelector("#selectMoney");
        const tipoCambio = selectConvert.options[selectConvert.selectedIndex].value;
        const resultado = document.querySelector('#resultado');
        const canvas = document.querySelector('#grafico');

        const datos = await obtenerDatos(tipoCambio);
        const valorCambio = datos.serie[0].valor;

        const conversionFinal = montoClp / valorCambio;
        resultado.innerHTML = conversionFinal.toFixed(2);

        const fechas = datos.serie.map((objeto) => objeto.fecha.slice(0, 10)).slice(0, 10);
        const valores = datos.serie.map((objeto) => objeto.valor).slice(0, 10);;

        const ctx = canvas.getContext('2d');
        const miGrafico = new Chart(ctx, {
          type: 'line',
          data: {
            labels: fechas,
            datasets: [{
              label: `${tipoCambio} a CLP`,
              data: valores,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true
          }
        });
    }   
    await conversor();
});




