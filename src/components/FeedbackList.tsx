import { AnimatePresence, motion } from "framer-motion";
import FeedbackItem from "./FeedbackItem";
import { useFeedbackContext } from "../context/FeedbackContext";
import Spinner from "./shared/Spinner";

export type FeedbackEntry = {
	id: number | string;
	rating: number;
	text: string;
};

function FeedbackList() {
	const { feedback, isLoading } = useFeedbackContext();

	if (!isLoading && (!feedback || feedback.length === 0)) {
		return <p>No feedback yet.</p>;
	}

	return isLoading ? (
		<Spinner />
	) : (
		<div className="feedback-list">
			<AnimatePresence>
				{feedback.map((item: FeedbackEntry) => (
					<motion.div
						key={item.id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<FeedbackItem key={item.id} item={item} />
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}

export default FeedbackList;
