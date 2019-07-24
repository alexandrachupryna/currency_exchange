import React from "react";

class SelectRate extends React.Component {
    

    render() {
        let currencyList = this.props.currencies;
        return (
                <table className='center'>
                    <caption>Current exchange rates</caption>
                    <tbody>
                    <tr>
                        <th>Currency</th>
                        <th>Rate</th>
                    </tr>
                    {
                      currencyList.map((elem, index)=>{
                        return (<tr key={index}>
                            <td title={elem.txt}>{elem.cc}</td> 
                            <td>{elem.rate}</td> 
                            </tr>)
                          })
                    }
                    </tbody>
                    
                </table>
        );
    }
}

export default SelectRate;