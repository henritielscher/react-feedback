import { v4 as uuidv4 } from "uuid";
import { createContext, useContext, useState } from "react";
import { FeedbackEntry } from "../components/FeedbackList";
import FeedbackData from "../data/FeedbackData";

type FeedbackEdit = {
	item: FeedbackEntry;
	edit: boolean;
};

type FeedbackProviderProps = {
	children: React.ReactChild | React.ReactChild[];
};

type FeedbackContext = {
	feedback: FeedbackEntry[];
	addFeedback: (newFeedback: FeedbackEntry) => void;
	deleteFeedback: (id: number | string) => void;
	editFeedback: (item: FeedbackEntry) => void;
	feedbackEdit: FeedbackEdit;
	updateFeedback: (updatedFeedback: FeedbackEntry) => void;
};

const FeedbackContext = createContext<FeedbackContext | undefined>(undefined);

const defaultFeedback = { id: 0, rating: 0, text: "" };

export function useFeedbackContext() {
	const context = useContext(FeedbackContext);
	if (context === undefined) {
		throw Error("FAAAALSCH!!");
	}

	return context;
}

export const FeedbackProvider = ({ children }: FeedbackProviderProps) => {
	const [feedback, setFeedback] = useState<FeedbackEntry[]>(FeedbackData);

	const [feedbackEdit, setFeedbackEdit] = useState<FeedbackEdit>({
		item: defaultFeedback,
		edit: false,
	});

	const updateFeedback = (updatedItem: FeedbackEntry) => {
		setFeedback(
			feedback.map((item) =>
				item.id === updatedItem.id ? updatedItem : item
			)
		);
	};

	const editFeedback = (item: FeedbackEntry) => {
		setFeedbackEdit({
			item,
			edit: true,
		});
	};

	const deleteFeedback = (id: number | string): void => {
		if (window.confirm("Are you sure you want to delete?")) {
			setFeedback(feedback.filter((item) => item.id !== id));
		}
	};

	const addFeedback = (newFeedback: FeedbackEntry): void => {
		setFeedback([newFeedback, ...feedback]);
	};

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				deleteFeedback,
				addFeedback,
				editFeedback,
				feedbackEdit,
				updateFeedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

export default FeedbackContext;
