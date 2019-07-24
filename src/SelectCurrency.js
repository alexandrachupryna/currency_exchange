import React from "react";

class  SelectCurrency extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        sellInputValue: 1,
        buyInputValue: 1,
        sellSelectValue: 'UAH',
        buySelectValue: 'USD',
        sellRate: 1,
        buyRate: 0 
      }
      this.sellSelectChange = this.sellSelectChange.bind(this);
      this.buySelectChange = this.buySelectChange.bind(this);
      this.inputChange = this.inputChange.bind(this);
      this.changeCurrencies = this.changeCurrencies.bind(this);
    }

    async componentDidMount() {
      this.props.currencies.push({"rate": 1, "cc": "UAH"});
      let rateUSD;
      this.props.currencies.forEach(item => {
          if(item.cc === "USD") {
              rateUSD = item.rate;
          }
      });
      this.setState({ 
          buyInputValue: (1 / rateUSD).toFixed(2), 
          buyRate: rateUSD 
        });
    }

    sellSelectChange(event) {
        let firstRate;
        this.props.currencies.forEach(item => {
            if(item.cc === event.target.value) {
                firstRate = item.rate;
            }
        });
      this.setState({
        sellSelectValue: event.target.value, 
        sellRate: firstRate, 
        buyInputValue: (firstRate * this.state.sellInputValue / this.state.buyRate).toFixed(2)
    });
    }

    buySelectChange(event) {
      let rate;
      this.props.currencies.forEach(item => {
          if(item.cc === event.target.value) {
              rate = item.rate;
          }
      });
    this.setState(
        {
          buySelectValue: event.target.value,
          buyRate: rate,
          buyInputValue: (this.state.sellRate * this.state.sellInputValue / rate).toFixed(2)
      });   
    }

    inputChange(event) {
      this.setState({
        sellInputValue: event.target.value,
        buyInputValue: (this.state.sellRate * event.target.value / this.state.buyRate).toFixed(2)
      });
    }

    changeCurrencies() {
        const currentValue = this.state.sellSelectValue;
        const currentRate = this.state.sellRate;
        this.setState({
            sellSelectValue: this.state.buySelectValue,
            buySelectValue: currentValue,
            buyInputValue: (this.state.buyRate * this.state.sellInputValue / this.state.sellRate).toFixed(2),
            sellRate: this.state.buyRate,
            buyRate: currentRate
        });
    }

    render() {
        let currencyList = this.props.currencies;
      
        return (
          <div className="currency_exchange">
          <div>
              <span>Sell</span>
              <div className="currency">
              <input 
                  type="number" 
                  min="1"
                  value={this.state.sellInputValue} 
                  className="soldCurrency"
                  onChange={this.inputChange}
                  />
                  <select value={this.state.sellSelectValue} onChange={this.sellSelectChange}>
                  {
                      currencyList.map((elem, index)=>{
                      return (<option key={index} value={elem.cc} rate={elem.rate}>
                          {elem.cc}
                      </option>)
                      })
                  }
              </select>
              </div> 
              
          </div>
          <button onClick={this.changeCurrencies}><i className="fas fa-exchange-alt"></i></button>
          <div>
              <span>Buy</span>
              <div>
              <input 
                  type="number"
                  value={this.state.buyInputValue}
                  disabled={true}
              />
              <select value={this.state.buySelectValue} onChange={this.buySelectChange} rate={this.state.buyInputValue}>
                  {
                      currencyList.map((elem, index)=>{
                      return (<option key={index} value={elem.cc} rate={elem.rate}>
                          {elem.cc}
                      </option>)
                      })
                  }
              </select>
              </div>
          </div>
      </div>
        );
    }
}

export default SelectCurrency;