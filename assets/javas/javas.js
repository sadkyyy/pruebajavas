const btnBuscar = document.getElementById("btnBuscar");

btnBuscar.addEventListener("click", async () => {
    const pesos = Number(document.getElementById("pesos").value);
    const moneda = document.getElementById("moneda").value;
    const resultado= document.getElementById("resultado");
 try { 
    const res = await fetch (`https://mindicador.cl/api/${moneda}`); 
    const data = await res.json();
    const valor = data.serie[0].valor;
    const convertir = pesos / valor;

 resultado.textContent = `${pesos} CLP es ${convertir.toFixed(2)} ${moneda}`;

 const ultimos10dias = data.serie.slice(0,10).reverse (); 
 const labels = ultimos10dias.map ((dia) => {
    return dia.fecha.slice(0,10);
 });
 const valores = ultimos10dias.map ((dia) => {
    return dia.valor;
 });
const config = {
    type: "line",
    data: {
        labels:labels,
        datasets: [{
            label: `Valor ${moneda}`,
            borderColor: "rgb(255, 99, 132)",
            data: valores
        }]
    } 
};
 const myChart = document.getElementById("myChart");
 myChart.style.backgroundColor = "white";
 new Chart(myChart, config);
 
 }
 catch (error) {
    console.log(error);
    }})

async function getMonedas() {
  const res = await fetch("https://mindicador.cl/api/");
  const data = await res.json();

  const monedasSection = document.querySelector(".monedasSection");
  let template = "";

  ["dolar", "peso", "euro"].forEach(key => {
    const moneda = data[key];
    template += `
      <div class="moneda">
        <h3>${moneda.nombre}</h3>
        <p>Valor actual: ${moneda.valor}</p>
      </div>
    `;
  });
 monedasSection.innerHTML = template; 
} 


getMonedas();

    





// async function prepararGrafica (monedass) {
//     const data = await getMonedas();
//     const config = {
//         type: "line",
//         data: {
//             labels: data.labels,
//             datasets: data.datasets 
//         }
//     };
//     const myChart = document.getElementById("myChart");
//     myChart.style.backgroundColor =
//     "white";
//     new Chart(myChart, config);
// }

// renderGrafica();

//     const tipoDeGrafico = "line";
//    const nombreMoneda = monedass.map((moneda) => moneda.Codigo);
//    const titulo = "Monedas";
//    const colorDeLinea = "rgb(255, 99, 132)";
//    const colorDeFondo = "white";
//    const valores = monedass.map((moneda) => {
//     const valor = moneda.Valor.replace(",", ".");
//     return Number(valor);
// });

//     const config = {
//         type: tipoDeGrafico,
//         data: {
//             labels: nombreMoneda,
//             datasets: [{
//                 label: titulo,
//                 borderColor: colorDeLinea,
//                 backgroundColor: colorDeFondo,
//                 data: valores
//                 }
//             ]
//         }
//      };
//             return config;
//         }
 
//         async function renderGrafica() {
// const monedas = await getMonedas();
// const config = prepararConfiguracionParaLaGrafica(monedas);
// const chartDOM = document.getElementById("myChart");
// new Chart(chartDOM, config);
// }
// renderGrafica(); 







// const labels = sismos.map((sismo) => {
// return sismo.Fecha;
// });

// const data = sismos.map((sismo) => {
// const magnitud = sismo.Magnitud.split(" ")[0];
// return Number(magnitud);
// });


// const datasets = [
// {
// label: "Sismo",
// borderColor: "rgb(255, 99, 132)",
// data
// }
// ];
// return { labels, datasets };
// } 

// async function renderGrafica() {
// const data = await getAndCreateDataToChart();
// const config = {
// type: "line"
// ,
// data
// };
// const myChart = document.getElementById("myChart");
// myChart.style.backgroundColor =
// "white";
// new Chart(myChart, config);
// }
// renderGrafica(); 
