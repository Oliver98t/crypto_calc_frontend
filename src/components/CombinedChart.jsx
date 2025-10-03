import React, { useState, useEffect } from 'react';
import CurrencyDropDown from "@/components/CurrencyDropDown.jsx";
import AnalysisDropDown from "@/components/AnalysisDropDown.jsx";
import OptionDropDown from "@/components/OptionDropDown.jsx";
import NumberChart from "@/components/NumberChart.jsx";
import TimeRange from "@/components/TimeRange.jsx";
import RsiGauge from './RsiGauge';
import { CalendarDate, now, ZonedDateTime } from '@internationalized/date';
import GaugeComponent from 'react-gauge-component'

const cryptoSeacrh = {
    'BTC' : "bitcoin",
    'SUI' : "sui",
    'SOL' : "solana",
    'ETH' : "ethereum"
}

const options = {
    default: {
        data: [null],
        urlToDisp_handler: null,
        dispToUrl_handler: null
    },

    moving_average: {
        data: ['day_ma=20', 'day_ma=10', 'day_ma=5'],
        urlToDisp_handler: urlToDispMaHandler,
        dispToUrl_handler: dispToUrlMaHandler
    },

    market_sentiment: {
        data: ['CoinDesk'],
        urlToDisp_handler: null,
        dispToUrl_handler: null
    },

    rsi: {
        data: ['day_rsi=14'],
        urlToDisp_handler: urlToDispRsiHandler,
        dispToUrl_handler: dispToUrlRsiHandler
    },
}

function urlToDispRsiHandler(url) {
    const args = url.split('=')
    return { interval: args[0], amount: args[1] };
}

function dispToUrlRsiHandler(disp) {
    //console.log(disp);
    const [value, unit] = disp.split(" ");
    return `interval=${value}`;
}

function urlToDispMaHandler(url) {
    const args = url.split('=')
    return { interval: args[0], amount: args[1] };
}

function dispToUrlMaHandler(disp) {
    const [value, unit] = disp.split(" ");
    return `${unit.slice(0, -1)}_ma=${value}`;
}

function getMonthsAgo(x) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentTime = now(timeZone);
    const subtractTime = currentTime.subtract({ months: x });
    const plainDate = new CalendarDate(
        subtractTime.calendar,
        subtractTime.era,
        subtractTime.year,
        subtractTime.month,
        subtractTime.day
    );
    return subtractTime;
}

export default function CombinedChart() {
    const [crypto, setCrypto] = useState('');
    const [fiat, setFiat] = useState('');
    const [analysis, setAnalysis] = useState('default');
    const [option, setOption] = useState('');
    const [range, setRange] = useState({
        start: getMonthsAgo(1),
        end: getMonthsAgo(0),
    });
    const [requests, setRequests] = useState([
        { endPoint: 'pair_data', option: null },

    ]);

    useEffect(() => {
        if (option && analysis) {
            const exists = requests.some(
                req => req.endPoint === analysis && req.option === option
            );
            console.log(requests);
            if (!exists) {
                setRequests(prev => [
                    ...prev,
                    { endPoint: analysis, option: option },
                ]);
            }
        }
    }, [option, analysis]);

    const handleCrypto = (value) => {
        setCrypto(value);
    };

    const handleFiat = (value) => {
        setFiat(value);
    };

    const handleAnalysis = (value) => {
        //console.log(value);
        setAnalysis(value);
        setOption('');
    };

    const handleOption = (value) => {
        console.log(`option: ${value}`);
        // convert back to parameter to be inserted into URL slug
        if (options[analysis].dispToUrl_handler) {
            value = options[analysis].dispToUrl_handler(value);
            console.log(value);
            setOption(value);
        }
        else {
            //console.log("no function");
            setOption(null);
        }
    };

    const ticker = crypto && fiat ? `${crypto}/${fiat}` : 'placeholder';

    return (
        <section className="flex flex-col items-center justify-center gap-4 w-full h-full">
            
            <div className="flex flex-row items-center justify-center border-2 border-gray-700 rounded-xl w-full max-w-5xl gap-4 p-4" style={{ height: "500px" }}>
                <div className="flex flex-row items-center justify-center border-2 border-gray-700 rounded-xl w-full h-full max-w-5xl gap-4 p-4">
                    <NumberChart
                        ticker={ticker}
                        startDate={range.start}
                        endDate={range.end}
                        requests={requests}
                    />
                </div>
                {/* Gauge takes up 1/5 of the parent */}
                <div className="flex flex-col items-center justify-center basis-1/5 h-2/5 border-2 border-gray-700 rounded-xl">
                    <RsiGauge searchString={cryptoSeacrh[crypto]} />
                    <h2 className="text-xl font-bold mb-2">Market Sentiment</h2>
                </div>
            </div>
            <div className="dark w-full max-w-5xl flex flex-row gap-4 items-center justify-center">
                <CurrencyDropDown
                    label="Crypto"
                    currency_type={"crypto"}
                    onSelect={handleCrypto}
                />
                <CurrencyDropDown
                    label="Fiat"
                    currency_type={"fiat"}
                    onSelect={handleFiat}
                />
                <AnalysisDropDown
                    label="Analysis"
                    onSelect={handleAnalysis}
                />
                <OptionDropDown
                    key={analysis}
                    label="Options"
                    options={options[analysis]}
                    onSelect={handleOption}
                />
                <TimeRange
                    onSelect={setRange}
                    initialDates={range}
                />
            </div>
        </section >
    );
}