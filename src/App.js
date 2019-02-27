import React, { Component } from 'react';
import './App.css';

class Search extends Component {
  state = {
    value: "",
    data: [],
    searchResults: []
  }

  getData = async () => {
    const response = await fetch("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000");
    const json = await response.json();
    for (let obj in json){
      json[obj]["favourite"] = false;
    }
    this.setState({data: json});
  }

  componentDidMount(){
    this.getData();
    console.log("Mapped garbage data.");
  }

  update = (e) => {
    this.setState({ value: e.target.value });
  }

  submit = (e) => { 
    e.preventDefault();
    this.setState({searchResults: this.state.data.filter(entry => 
      entry.body.includes(this.state.value) || entry.category.includes(this.state.value)
   || entry.keywords.includes(this.state.value) || entry.title.includes(this.state.value)
    )});
  }

  render() {
    return (
      <div>
        <form className="Form">
            <input type="text" value={this.state.value} onChange={this.update} className="Form-input"></input>
            <button onClick={this.submit} className="Form-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
            </button>
        </form>
        <table>
          <tbody>
            {this.state.searchResults.map((entry, i) => {
              return(
              <tr key={i}>
                <td>
                  <button>{entry.favourite === true ? "STARED" : "STAR"}</button> 
                </td>
                <td>{entry.title}</td>
                <td>{entry.body}</td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-title-bar">
            <h1 className="App-title">Toronto Waste Lookup</h1>
        </div>
        <div className="Body">
          <br></br>
          <Search />
        </div>  
      </div>
    );
  }
}

export default App;
