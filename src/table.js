var Table = React.createTable({
	getInitialState: function(){
		return {data: this.props.data};
	}
});

React.renderComponent (
	Table({data: []}),
);

/*var ResultItem = React.createClass({
render:function(){
    var camper = this.props.user;
    return(
                        <tr >
                            <td>{camper.id}</td>
                            <td>{camper.name}</td>
                            <td>{camper.independent}</td>
                            <td>{camper.description}</td>
                            <td>{camper.uuid}</td>
                        </tr>

                );
          }
       });

import React from 'react';

export default class ItemList extends React.Component{
  constructor() {
    super();
    this.state = {items:[]};
  }

  componentDidMount() {
    fetch('http://pokeapi.co/api/v2/pokemon/1/').then(result=> {
      this.setState({items:result.json()});
    })
  }

  render() {
    return (
        <div>
          <div>Items:</div>
          { this.state.items.map(item=> { return <div>{http://item.name}</div>}) }          
        </div>
      )
  }
}*/