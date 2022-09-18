interface DumbProps {
	text: string;
	fn: () => void;
}

export default function Dumb(props: DumbProps): JSX.Element {
	return (
		<>
			<p>{props.text}</p>
			<button onClick={props.fn}>Apretar</button>
		</>
	);
}
