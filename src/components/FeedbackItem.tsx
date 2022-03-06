import { FeedbackEntry } from "./FeedbackList";
import { useFeedbackContext } from "../context/FeedbackContext";
import { FaTimes, FaEdit } from "react-icons/fa";
import Card from "./shared/Card";

type FeedbackItemProps = {
	item: FeedbackEntry;
};

function FeedbackItem({ item }: FeedbackItemProps) {
	const { deleteFeedback, editFeedback } = useFeedbackContext();

	return (
		<Card reverse={false}>
			<div className="num-display">{item.rating}</div>
			<button onClick={() => deleteFeedback(item.id)} className="close">
				<FaTimes color="purple" />
			</button>
			<button className="edit">
				<FaEdit color="purple" onClick={() => editFeedback(item)} />
			</button>
			<div className="text-display">{item.text}</div>
		</Card>
	);
}

export default FeedbackItem;
