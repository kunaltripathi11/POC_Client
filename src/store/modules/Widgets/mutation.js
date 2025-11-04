export default {
	addWidget(state, widget) {
		state.widgets.push(widget);
	},
	setWidget(state, data) {
		state.allWidget = data;
	},
};
