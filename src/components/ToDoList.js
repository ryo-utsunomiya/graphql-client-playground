import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const TODOS_QUERY = gql`
  query ToDosQuery {
    todos {
      id,
      title
    }
  }
`;

const ADD_MUTATION = gql`
  mutation AddMutation($input: ToDoInput) {
    addToDo(input: $input) {
      title
    }
  }
`;

class ToDoList extends Component {
  state = { title: ' '}

  render() {
    const todoList = this.props.data.todos || [];

    return (
      <div>
        <input
          value={this.state.title}
          onChange={e => this.setState({title: e.target.value})}
        />
        <button type="submit" onClick={() => this._addToDo()}>
          Add
        </button>
        {todoList.map(
          todo => <p key={todo.id}>{todo.title}</p>
        )}
      </div>
    );
  }

  _addToDo = () => {
    this.props.addMutation({
      variables: {
        input: {
          title: this.state.title
        }
      },
      refetchQueries: [{ query: TODOS_QUERY }],
    }).then(({data}) => console.log(data.addToDo));
    this.setState({ title: '' });
  }
}

export default compose(
  graphql(TODOS_QUERY),
  graphql(ADD_MUTATION, { name: 'addMutation' })
)(ToDoList);
