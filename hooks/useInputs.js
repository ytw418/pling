import { useState, useCallback } from "react";
import { gql } from "@apollo/client";

function useInputs(initialForm) {
	const [form, setForm] = useState(initialForm);
	// change

	const onChange = useCallback(
		(e) => {
			const { name, value } = e.target;
			setForm({ ...form, [name]: value });
		},
		[form]
	);
	const reset = useCallback(() => setForm(initialForm), [initialForm]);
	return [form, onChange, reset];
}

export default useInputs;
