import React from "react";

function nullCorrect(num) {
    return num < 10 ? "0" + num : num;
}

class CurrentDate extends React.Component {
    render() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        day = nullCorrect(day);
        month = nullCorrect(month);
        return (
            <hgroup className="centerHgroup">
                <h1>Currency Converter</h1>
                <h3>According to the NBU rate on {day}.{month}.{year}</h3>
            </hgroup>
        );
    }
}

export default CurrentDate;