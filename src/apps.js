var App = React.createClass({
  getInitialState:function(){
    return{
        data:[]
    };
},

getDataFromServer:function(URL){
    $.ajax({
        type:"GET",
        dataType:"json",
        url:"http://pokeapi.co/api/v2/type/3/",
        headers:{
          'Content-Type':'application/json',
        },
        success: function(response) {
            this.showResult(response);
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
},

showResult: function(response) {
  this.setState({
    data: JSON.parse(response)
  });
},

var Result = React.createClass({
render:function(){
    var result = this.props.result.map(function(result,index){
        return <ResultItem key={index} user={ result }/>
    });
    return(
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="col-md-4">Id</th>
                <th>Name</th>
                <th>Independent</th>
                <th>Description</th>
                <th>uuid</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>
      </div>)
  }
});

ReactDOM.render (
  <Result />,
  document.getElementById('content')
);