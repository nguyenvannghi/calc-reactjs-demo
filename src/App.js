import React, { Component, Fragment } from 'react';
import { bignumber, add, divide, multiply, subtract } from 'mathjs';
import './App.scss';
const SUM = '+'; // +
const MUL = '*'; // *
const DIV = '/'; // /
const SUB = '-'; // -
const intitalState = {
  answer: '0',
  resultData: 0,
  prevValue: '',
  nextValue: '',
  isCalcAction: null,
  isDecimal: false
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = intitalState
  }

  onClear = () => {
    this.setState({
      ...intitalState
    })
  }

  onDecimal = () => {
    this.setState(prevstate => ({
      isDecimal: true, 
      prevValue: !this.state.isCalcAction  ? prevstate.prevValue + '.' : prevstate.prevValue,
      nextValue: this.state.isCalcAction  ? prevstate.nextValue + '.' : prevstate.nextValue,
    }))
  }

  onClickNumber = (e) => {
    const { target } = e;
    const { value } = target;
    const { isDecimal, isCalcAction} = this.state;
    if (!isDecimal) {
      if (!isCalcAction) {
        this.setState(prevstate => ({ prevValue: (Number(prevstate.prevValue) === 0 || prevstate.prevValue === '0' ? value : prevstate.prevValue + '' + value) }), () => {
          this.setState({
            answer: (this.state.prevValue.replace(/ /g, ''))
          })
        });
      } else {
        this.setState(prevstate => ({ nextValue: (Number(prevstate.nextValue) === 0 || prevstate.nextValue === '0' ? value : prevstate.nextValue + '' + value) }), () => {
          this.setState({
            answer: (this.state.nextValue.replace(/ /g, ''))
          })
        });
      }
    } else {
      if (!isCalcAction) {
        this.setState(prevstate => ({ prevValue: prevstate.prevValue.toString().includes('.') > -1 ? (prevstate.prevValue + '' + value) : (prevstate.prevValue + '.' + value) }), () => {
          this.setState({
            answer: (this.state.prevValue.replace(/ /g, ''))
          })
        });
      } else {
        this.setState(prevstate => ({ nextValue: prevstate.nextValue.toString().includes('.') > -1 ? (prevstate.nextValue + '' + value) : (prevstate.nextValue + '.' + value) }), () => {
          this.setState({
            answer: (this.state.nextValue.replace(/ /g, ''))
          })
        });
      }
    }
  }

  onCalcAction = (e) => {
    const { target } = e;
    const { value } = target;
    this.setState({ isCalcAction: value, answer: value, isDecimal: false })
  }

  onCalc = () => {
    let result;
    const { prevValue, nextValue, isCalcAction } = this.state;
    const newPreValue = Number(prevValue.replace(/ /g, ''));
    const newNextValue = Number(nextValue.replace(/ /g, ''));
    switch (isCalcAction) {
      case SUM:
        result = add(bignumber(newPreValue), bignumber(newNextValue));
        break;
      case MUL:
        result = multiply(bignumber(newPreValue), bignumber(newNextValue));
        break;
      case DIV:
        result = divide(bignumber(newPreValue), bignumber(newNextValue));
        break;
      case SUB:
        result = subtract(bignumber(newPreValue), bignumber(newNextValue));
        break;
      default:
        result = bignumber(isCalcAction ? newNextValue : newPreValue);
        break;
    }
    this.onValidateCaclc(result.toNumber());
  }

  onValidateCaclc = (data) => {
    let message = data.toString();
    if (!isFinite(data)) {
      if (isNaN(data)) {
        message = "Result is undefined"
      } else {
        message = "Cannot divide by zero‬";
      }
    }
    this.setState({ answer: message, resultData: data, prevValue: !isFinite(data) ? '0' : data.toString(), nextValue: '0', isCalcAction: false, isDecimal: !!(data % 1) })
  }

  render() {
    const { answer } = this.state;
    return (
      <Fragment>
        <div className="calc-box">
          <input type="text" name="answer" value={answer} readOnly />
          <br />

          <input type="button" defaultValue="1" onClick={this.onClickNumber} />
          <input type="button" defaultValue="2" onClick={this.onClickNumber} />
          <input type="button" defaultValue="3" onClick={this.onClickNumber} />
          <input type="button" defaultValue="+" onClick={this.onCalcAction} />
          <br />

          <input type="button" defaultValue="4" onClick={this.onClickNumber} />
          <input type="button" defaultValue="5" onClick={this.onClickNumber} />
          <input type="button" defaultValue="6" onClick={this.onClickNumber} />
          <input type="button" defaultValue="-" onClick={this.onCalcAction} />
          <br />

          <input type="button" defaultValue="7" onClick={this.onClickNumber} />
          <input type="button" defaultValue="8" onClick={this.onClickNumber} />
          <input type="button" defaultValue="9" onClick={this.onClickNumber} />
          <input type="button" defaultValue="*" onClick={this.onCalcAction} />
          <br />


          <input type="button" defaultValue="0" onClick={this.onClickNumber} />
          <input type="button" defaultValue="." onClick={this.onDecimal} />
          <input type="button" defaultValue="=" onClick={this.onCalc} />
          <input type="button" defaultValue="/" onClick={this.onCalcAction} />
          <br />
          <input type="button" defaultValue=" clear " onClick={this.onClear} />
        </div>
      </Fragment>
    );
  }
}

export default (App);
