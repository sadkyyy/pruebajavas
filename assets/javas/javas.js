//javas

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

    