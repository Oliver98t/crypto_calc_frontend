import React, { useRef, useEffect } from 'react';
import Plot from 'react-plotly.js';

const LIGHTNING_KEY = import.meta.env.VITE_LIGHTNING_KEY;

async function cryptoCalcApi(ticker, startDate, endDate, requests) {
    const data = [];
    for (const request of requests) {
        const unixStartMs = startDate.toDate().getTime();
        const fromTs = Math.floor(unixStartMs / 1000);
        const unixEndMs = endDate.toDate().getTime();
        const toTs = Math.floor(unixEndMs / 1000);

        const [crypto, fiat] = ticker.split('/');
        let url = `http://localhost:8000/ohlcv/${request.endPoint}/?pair=${crypto}/${fiat}&from_ts=${fromTs}&to_ts=${toTs}`;
        if (request.option) url += `&${request.option}`;

        const res = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();

        let legend = request.endPoint.replace('_', ' ');
        if (request.option) {
            const [value] = request.option.match(/-?\d+(\.\d+)?/g);
            const [unit] = request.option.split('_');
            legend = `${value} ${unit} ${legend}`;
        }

        data.push({ ticker: legend, data: json.data });
    }
    return data;
}

const NumberChart = ({ ticker, startDate, endDate, requests }) => {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        if (!ticker.includes('/')) return;

        cryptoCalcApi(ticker, startDate, endDate, requests)
            .then((apiDataSets) => {
                chartContainerRef.current.innerHTML = '';
                const plotDiv = document.createElement('div');
                plotDiv.id = 'plotly-chart';
                chartContainerRef.current.appendChild(plotDiv);

                const traces = apiDataSets.map((set) => {
                    if (!Array.isArray(set.data) || set.data.length === 0) return null;

                    const x = set.data.map((d) => new Date(d.timestamp * 1000));
                    const y = set.ticker.includes('rsi')
                        ? set.data.map((d) => d.rsi)
                        : set.data.map((d) => d.price);

                    return {
                        x,
                        y,
                        type: 'scattergl',
                        mode: 'lines+markers',
                        name: set.ticker.includes('rsi') ? 'RSI' : set.ticker,
                        yaxis: set.ticker.includes('rsi') ? 'y2' : 'y',
                        marker: { size: 4 },
                    };
                }).filter(Boolean);

                const layout = {
                    autosize: true,
                    title: { text: ticker, font: { color: 'white' } },
                    paper_bgcolor: '#222',
                    plot_bgcolor: '#222',
                    font: { color: 'white' },
                    xaxis: {
                        title: { text: 'Date', font: { color: 'white' } },
                        color: 'white',
                        gridcolor: '#444',
                        showspikes: true,
                        spikemode: 'across',
                        spikesnap: 'cursor',
                        spikedash: 'dash',
                        spikethickness: 1,
                        spikecolor: 'white',
                    },
                    yaxis: {
                        title: { text: ticker.split('/')[1], font: { color: 'white' } },
                        color: 'white',
                        gridcolor: '#444',
                        showspikes: true,
                        spikemode: 'across',
                        spikesnap: 'cursor',
                        spikedash: 'dash',
                        spikethickness: 1,
                        spikecolor: 'white',
                    },
                    yaxis2: {
                        title: { text: 'RSI', font: { color: 'white' } },
                        overlaying: 'y',
                        side: 'right',
                    },
                    hovermode: 'x',
                    hoverlabel: {
                        bgcolor: '#333',
                        font: { color: 'white' },
                    },
                };

                Plotly.newPlot(plotDiv, traces, layout, { responsive: true });
            })
            .catch((err) => {
                console.error('Error fetching or rendering data:', err);
            });

        return () => {
            if (chartContainerRef.current) {
                chartContainerRef.current.innerHTML = '';
            }
        };
    }, [ticker, startDate, endDate, requests]);

return (
    <div
        ref={chartContainerRef}
        className="w-full h-full rounded-xl overflow-clip"
    ></div>
);

};

export default NumberChart;