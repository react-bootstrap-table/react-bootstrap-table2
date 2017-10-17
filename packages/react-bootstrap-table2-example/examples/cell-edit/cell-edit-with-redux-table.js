/* eslint no-unused-vars: 0 */
/* eslint react/prop-types: 0 */
/* eslint arrow-body-style: 0 */
/* eslint consistent-return: 0 */
/* eslint no-class-assign: 0 */
import React, { Component } from 'react';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import BootstrapTable from 'react-bootstrap-table2';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const sourceCode = `\
/////////////////////// Action Creator ///////////////////////
const setErrorMessage = (errorMessage = null) => {
  return { type: 'SET_ERR_MESSAGE', errorMessage };
};

// Async Action, using redux-thunk
const cellEditingAsync = (rowId, dataField, newValue) => {
  return (dispatch) => {
    setTimeout(() => {
      if (dataField === 'price' && (newValue < 2000 || isNaN(newValue))) {
        dispatch(setErrorMessage('Product Price should bigger than $2000'));
      } else {
        dispatch({ type: 'ADD_SUCCESS', rowId, dataField, newValue });
      }
    }, 1200);
  };
};

/////////////////////// Component ///////////////////////
class CellEditWithRedux extends Component {
  // dispatch a async action
  handleCellEditing = (rowId, dataField, newValue) => {
    this.props.dispatch(cellEditingAsync(rowId, dataField, newValue));
    return false;
  }

  handleErrorMsgDisappear = () => {
    this.props.dispatch(setErrorMessage());
  }

  render() {
    const cellEdit = {
      mode: 'click',
      editing: this.props.cellEditing,
      errorMessage: this.props.errorMessage,
      onUpdate: this.handleCellEditing,
      onErrorMessageDisappear: this.handleErrorMsgDisappear
    };

    return (
      <div>
        <BootstrapTable keyField="id" data={ this.props.data } columns={ columns } cellEdit={ cellEdit } />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
// connect
CellEditWithRedux = connect(state => state)(CellEditWithRedux);

/////////////////////// Reducer ///////////////////////
// initial state object and simple reducers
const initialState = {
  data: productsGenerator(),
  cellEditing: false,
  errorMessage: null
};

const reducers = (state, action) => {
  switch (action.type) {
    case 'ADD_SUCCESS': {
      const { rowId, dataField, newValue } = action;
      const data = [...state.data];
      const rowIndex = data.findIndex(r => r.id === rowId);
      data[rowIndex][dataField] = newValue;
      return {
        data,
        cellEditing: false,
        errorMessage: null
      };
    }
    case 'SET_ERR_MESSAGE': {
      const { errorMessage } = action;
      return {
        ...state,
        cellEditing: true,
        errorMessage
      };
    }
    default: {
      return { ...state };
    }
  }
};

/////////////////////// Index ///////////////////////
const store = createStore(reducers, initialState, applyMiddleware(thunk));

const Index = () => (
  <Provider store={store}>
    <CellEditWithRedux />
  </Provider>
);
`;

const setErrorMessage = (errorMessage = null) => {
  return { type: 'SET_ERR_MESSAGE', errorMessage };
};

// Async Action, using redux-thunk
const cellEditingAsync = (rowId, dataField, newValue) => {
  return (dispatch) => {
    setTimeout(() => {
      if (dataField === 'price' && (newValue < 2000 || isNaN(newValue))) {
        dispatch(setErrorMessage('Product Price should bigger than $2000'));
      } else {
        dispatch({ type: 'ADD_SUCCESS', rowId, dataField, newValue });
      }
    }, 1200);
  };
};

class CellEditWithRedux extends Component {
  // dispatch a async action
  handleCellEditing = (rowId, dataField, newValue) => {
    this.props.dispatch(cellEditingAsync(rowId, dataField, newValue));
    return false;
  }

  handleErrorMsgDisappear = () => {
    this.props.dispatch(setErrorMessage());
  }

  render() {
    const cellEdit = {
      mode: 'click',
      editing: this.props.cellEditing,
      errorMessage: this.props.errorMessage,
      onUpdate: this.handleCellEditing,
      onErrorMessageDisappear: this.handleErrorMsgDisappear
    };

    return (
      <div>
        <BootstrapTable keyField="id" data={ this.props.data } columns={ columns } cellEdit={ cellEdit } />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
// connect
CellEditWithRedux = connect(state => state)(CellEditWithRedux);

// initial state object and simple reducers
const initialState = {
  data: productsGenerator(),
  cellEditing: false,
  errorMessage: null
};

const reducers = (state, action) => {
  switch (action.type) {
    case 'ADD_SUCCESS': {
      const { rowId, dataField, newValue } = action;
      const data = JSON.parse(JSON.stringify(state.data));
      const rowIndex = data.findIndex(r => r.id === rowId);
      data[rowIndex][dataField] = newValue;
      return {
        data,
        cellEditing: false,
        errorMessage: null
      };
    }
    case 'SET_ERR_MESSAGE': {
      const { errorMessage } = action;
      return {
        ...state,
        cellEditing: true,
        errorMessage
      };
    }
    default: {
      return { ...state };
    }
  }
};

const store = createStore(reducers, initialState, applyMiddleware(thunk));

const Index = () => (
  <Provider store={store}>
    <CellEditWithRedux />
  </Provider>
);

export default Index;

