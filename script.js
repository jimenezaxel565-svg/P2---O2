// script.js - Visualización de la distribución exponencial (λ=3)
// Muestra la función de densidad f(x)=3e^{-3x} y destaca:
//   - P(X < 10): área bajo la curva desde 0 hasta 10 (prácticamente total)
//   - P(X > 5): área a la derecha de x=5 (extremadamente pequeña)

const lambda = 3;

function exponencialPDF(x, lambda) {
    return lambda * Math.exp(-lambda * x);
}

// Rango de x: hasta 6, donde la densidad ya es casi cero
const xMax = 6;
const step = 0.01;
const xCurve = [];
const yCurve = [];

for (let x = 0; x <= xMax; x += step) {
    xCurve.push(x);
    yCurve.push(exponencialPDF(x, lambda));
}

// Área para P(X < 10): de 0 a xMax (la cola es despreciable)
const xFill = [];
const yFill = [];
for (let x = 0; x <= xMax; x += step) {
    xFill.push(x);
    yFill.push(exponencialPDF(x, lambda));
}

// Traza de la curva
const traceCurve = {
    x: xCurve,
    y: yCurve,
    type: 'scatter',
    mode: 'lines',
    name: 'f(x) = 3·e^{-3x}',
    line: { color: '#1f77b4', width: 2.5 },
    hoverinfo: 'x+y'
};

// Área sombreada que representa P(X < 10)
const traceArea = {
    x: xFill,
    y: yFill,
    type: 'scatter',
    mode: 'lines',
    name: 'P(X < 10) ≈ 1 (área bajo la curva)',
    fill: 'tozeroy',
    fillcolor: 'rgba(31, 119, 180, 0.3)',
    line: { color: 'rgba(0,0,0,0)', width: 0 },
    hoverinfo: 'none'
};

// Línea vertical en x = 5
const shapes = [
    {
        type: 'line',
        x0: 5,
        x1: 5,
        y0: 0,
        y1: exponencialPDF(5, lambda),
        line: { color: 'red', width: 2, dash: 'dash' }
    }
];

// Anotaciones (texto plano para evitar problemas con LaTeX en Plotly)
const annotations = [
    {
        x: 5.2,
        y: exponencialPDF(5, lambda) * 0.8,
        xref: 'x',
        yref: 'y',
        text: 'P(X > 5) = e^{-15} ≈ 3.06e-7  (área despreciable)',
        showarrow: true,
        arrowhead: 2,
        arrowsize: 1,
        arrowwidth: 1,
        arrowcolor: 'red',
        ax: 40,
        ay: -30,
        font: { size: 10, color: 'red' }
    },
    {
        x: 1.5,
        y: 1.2,
        xref: 'x',
        yref: 'y',
        text: 'P(X < 10) ≈ 1  (99.999999%)',
        showarrow: false,
        font: { size: 12, color: '#1f77b4', weight: 'bold' }
    }
];

const layout = {
    title: 'Distribución exponencial del tiempo entre solicitudes (λ = 3)',
    xaxis: {
        title: 'Tiempo (días)',
        range: [0, 6],
        dtick: 1,
        gridcolor: '#ddd'
    },
    yaxis: {
        title: 'Densidad de probabilidad',
        range: [0, 3.2],
        gridcolor: '#ddd'
    },
    shapes: shapes,
    annotations: annotations,
    legend: {
        x: 0.65,
        y: 0.95,
        bgcolor: 'rgba(255,255,255,0.8)',
        bordercolor: '#ccc',
        borderwidth: 1
    },
    hovermode: 'closest'
};

Plotly.newPlot('grafico', [traceArea, traceCurve], layout);