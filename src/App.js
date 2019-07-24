import React from 'react';
import SelectRate from './SelectRate.js';
import SelectCurrency from './SelectCurrency.js';
import CurrentDate from './CurrentDate.js';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      currencies: null
    };
  }

  async componentDidMount() {
    const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
    const response = await fetch(url);
    const data = await response.json();
    
    this.setState({ currencies: data, loading: false});
}

render() {
  if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.currencies) {
      return <div>didn't get a currency</div>;
    }

  return (
      <div>
          <CurrentDate />
          <SelectCurrency currencies={this.state.currencies} />
          <SelectRate currencies={this.state.currencies} />
      </div> 
  )
}
}


export default App;
