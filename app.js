const { Component, createElement } = React;

const ListItem = props => {
	return createElement('li', { className: 'list-item', onClick: props.removeHandler, 'data-val': props.dVal }, props.content);
}

// const ConfButton = props => {
// 	return createElement('button', { onClick: props.hideModal }, props.text);
// }

class List extends Component {
	constructor() {
		super();
		this.state = {
			items: ['Apple', 'Banana', 'Orange', 'Pineapple'],
			inputVal: ''
		}
	}
	// hideModal(confirmVal) {

	// }
	// showModal(val, text) {
	// 	const mod = document.getElementById('modal');
	// 	mod.innerText = `Delete ${text}?`;
	// 	mod.classList.remove('hidden');
	// }
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
		})
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
			// createElement('div', { key: 'modal', id: 'modal', className: 'hidden' }, [
			// 	createElement(ConfButton, { key: 'yes-button', hideModal: this.hideModal, text: 'Yes' }),
			// 	createElement(ConfButton, { key: 'no-button', hideModal: this.hideModal, text: 'No' }),
			// ]),
			createElement('input', { key: 'input', onChange: this.inputChangeHandler.bind(this), placeholder: 'New item text...', value: this.state.inputVal }),
			createElement('ul', { key: 'root' }, this.state.items.map((item, i) => {
				return createElement(ListItem, { content: item, key: i, dVal: i, removeHandler: this.removeHandler.bind(this) });
			})),
			createElement('button', { key: 'button', onClick: this.addItemHandler.bind(this), disabled: this.state.inputVal === '' ? true : false }, 'Add item')
		]);
	}
}

ReactDOM.render(createElement(List), document.getElementById('root'));