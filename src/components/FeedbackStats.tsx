import { FeedbackEntry } from "./FeedbackList";
import { useFeedbackContext } from "../context/FeedbackContext";

function FeedbackStats() {
	const { feedback } = useFeedbackContext();

	// Calculate ratings average
	let average =
		feedback.reduce((acc: number, cur: FeedbackEntry): number => {
			return acc + cur.rating;
		}, 0) / feedback.length;

	average = parseFloat(average.toFixed(1).replace(/[.,]0$/, ""));

	return (
		<div className="feedback-stats">
			<h4>{feedback.length} Reviews</h4>
			<h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
		</div>
	);
}

export default FeedbackStats;
