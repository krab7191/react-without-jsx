const { Component, createElement } = React;

const ListItem = props => {
	return createElement('li', { className: 'list-item', onClick: props.removeHandler, 'data-val': props.dVal }, props.content);
}
class List extends Component {
	constructor() {
		super();
		this.state = {
			items: ['Apple', 'Banana', 'Orange', 'Pineapple'],
			inputVal: ''
		}
	}
	removeHandler(e) {
		const val = e.target.getAttribute('data-val');
		const { innerText } = e.target;
		// this.showModal(val, innerText);
		const conf = window.confirm(`Delete ${innerText}?`);
		if (conf) {
			const newState = [...this.state.items];
			newState.splice(val, 1);
			this.setState(() => {
				return { items: newState }
			});
		}
	}
	addItemHandler() {
		this.setState((prevState) => {
			return { items: prevState.items.concat(this.state.inputVal), inputVal: '' }
		});
		document.getElementById('inputElem').focus();
	}
	inputChangeHandler(e) {
		const { target } = e;
		const { value } = target;
		this.setState(() => {
			return { inputVal: value }
		});
	}

	render() {
		return createElement('div', { className: 'list' }, [
			createElement('form', { key: 'form' }, [
				createElement('input', {
					key: 'input', id: 'inputElem', onChange: this.inputChangeHandler.bind(this),
					placeholder: 'New item text...', value: this.state.inputVal
				}),
				createElement('button', { key: 'button', onClick: this.addItemHandler.bind(this), disabled: this.state.inputVal === '' ? true : false }, 'Add item')
			]),
			createElement('ul', { key: 'root' }, this.state.items.map((item, i) => {
				return createElement(ListItem, { content: item, key: i, dVal: i, removeHandler: this.removeHandler.bind(this) });
			}))
		]);
	}
}

ReactDOM.render(createElement(List), document.getElementById('root'));