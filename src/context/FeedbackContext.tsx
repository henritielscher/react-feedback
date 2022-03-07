import { createContext, useContext, useEffect, useState } from "react";
import { FeedbackEntry } from "../components/FeedbackList";

type FeedbackEdit = {
	item: FeedbackEntry;
	edit: boolean;
};

type FeedbackProviderProps = {
	children: React.ReactChild | React.ReactChild[];
};

type FeedbackContext = {
	feedback: FeedbackEntry[];
	addFeedback: (newFeedback: FeedbackEntry) => Promise<void>;
	deleteFeedback: (id: number | string) => Promise<void>;
	editFeedback: (item: FeedbackEntry) => void;
	feedbackEdit: FeedbackEdit;
	updateFeedback: (updatedFeedback: FeedbackEntry) => Promise<void>;
	isLoading: boolean;
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
	const baseUrl = "http://localhost:5000";
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
	const [feedbackEdit, setFeedbackEdit] = useState<FeedbackEdit>({
		item: defaultFeedback,
		edit: false,
	});

	useEffect(() => {
		fetchFeedback();
	}, []); // mit leerem Array als Argument wird die Funktion nur einmal ausgeführt

	// FETCHING
	const fetchFeedback = async () => {
		const response = await fetch(`${baseUrl}/feedback`);
		const data = await response.json();

		setFeedback(data);
		setIsLoading(false);
	};

	// CRUD
	const updateFeedback = async (
		updatedItem: FeedbackEntry
	): Promise<void> => {
		const response = await fetch(`${baseUrl}/feedback/${updatedItem.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedItem),
		});
		const data = await response.json();
		setFeedback(
			feedback.map((item) => (item.id === data.id ? data : item))
		);
	};

	const editFeedback = (item: FeedbackEntry) => {
		setFeedbackEdit({
			item,
			edit: true,
		});
	};

	const deleteFeedback = async (id: number | string): Promise<void> => {
		try {
			await fetch(`${baseUrl}/feedback/${id}`, {
				method: "DELETE",
			});
			setFeedback(feedback.filter((item) => item.id !== id));
		} catch (error: any) {
			throw Error(error);
		}
	};

	const addFeedback = async (newFeedback: FeedbackEntry): Promise<void> => {
		try {
			const response = await fetch(`${baseUrl}/feedback`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newFeedback),
			});

			const data = await response.json();
			setFeedback([data, ...feedback]);
		} catch (error: any) {
			throw Error(error);
		}
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
				isLoading,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

export default FeedbackContext;
