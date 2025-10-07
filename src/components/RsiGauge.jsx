import React, { useState, useEffect } from 'react';
import GaugeComponent from 'react-gauge-component';

const RsiGauge = ({searchString}) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!searchString) return;
        fetch(
            `/api/ohlcv/market_sentiment/?&search_string=${searchString}`,
            {
                headers: {
                    Accept: 'application/json',
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.data.sentiment_score)
                setValue(data.data.sentiment_score * 100);
            })
            .catch((error) => {
                console.error('Error fetching market sentiment:', error);
            });
    }, [searchString]);

    return (
        <GaugeComponent
            id="simple-gauge"
            value={value}
            labels={{
                markLabel: {
                    marks: [
                        { value: 20 },
                        { value: 50 },
                        { value: 80 },
                        { value: 100 }
                    ]
                }
            }}
            needle={{ elastic: true }}
        />
    );
};

export default RsiGauge;