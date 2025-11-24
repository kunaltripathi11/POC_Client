import { useToast } from "vue-toastification";

const toast = useToast();

export default {
	success(message, options = {}) {
		toast.success(message, {
			position: "top-right",
			timeout: 3000,
			closeOnClick: true,
			draggable: true,
			draggablePercent: 0.3,
			...options,
		});
	},

	error(message, options = {}) {
		toast.error(message, {
			position: "top-right",
			timeout: 3000,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			draggablePercent: 0.3,
			...options,
		});
	},
	warning(message, options = {}) {
		toast.warning(message, {
			position: "top-right",
			timeout: 3000,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			draggablePercent: 0.3,
			hideProgressBar: true,
			...options,
		});
	},
};
