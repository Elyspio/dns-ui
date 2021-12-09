import React from "react";

/**
 *
 * @param defaultState initial state of modal (open or not)
 */
export function useModal(defaultState: boolean) {
	const [state, setOpen] = React.useState<boolean>(defaultState);

	const open = React.useCallback(
		(e?: any) => {
			e?.stopPropagation();
			if (!state) {
				setOpen(true);
			}
		},
		[state]
	);
	const close = React.useCallback(
		(e?: any) => {
			e?.stopPropagation();
			if (state) {
				setOpen(false);
			}
		},
		[state]
	);

	return {
		open: state,
		setOpen: open,
		setClose: close,
	};
}
