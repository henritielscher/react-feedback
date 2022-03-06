import Card from "./shared/Card";
import { useFeedbackContext } from "../context/FeedbackContext";
import React, { useState, useEffect } from "react";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";

function FeedbackForm() {
	const [text, setText] = useState<string>("");
	const [rating, setRating] = useState(10);
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [message, setMessage] = useState<string>("");

	const { addFeedback, feedbackEdit, updateFeedback } = useFeedbackContext();

	useEffect(() => {
		if (feedbackEdit.edit) {
			setBtnDisabled(false);
			setText(feedbackEdit.item.text);
			setRating(feedbackEdit.item.rating);
		}
	}, [feedbackEdit]);

	const handleTextChange = (e: React.BaseSyntheticEvent): void => {
		if (text === "") {
			setBtnDisabled(true);
			setMessage("");
		} else if (text !== "" && text.trim().length <= 10) {
			setMessage("Text must be at least 10 characters.");
			setBtnDisabled(true);
		} else {
			setMessage("");
			setBtnDisabled(false);
		}
		setText(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault();
		if (text.trim().length > 10) {
			const newFeedback = {
				text,
				rating,
				id: "" as string | number,
			};

			if (feedbackEdit.edit) {
				newFeedback.id = feedbackEdit.item.id;
				updateFeedback(newFeedback);
			} else {
				newFeedback.id = uuidv4();
				addFeedback(newFeedback);
			}
			setText("");
		}
	};

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate your service with us?</h2>
				<RatingSelect select={(rating: number) => setRating(rating)} />
				<div className="input-group">
					<input
						type="text"
						placeholder="Write a review"
						onChange={handleTextChange}
						value={text}
					/>
					<Button type="submit" isDisabled={btnDisabled}>
						Send
					</Button>
				</div>
				{message && <div className="message">{message}</div>}
			</form>
		</Card>
	);
}

export default FeedbackForm;
function uuidv4(): any {
	throw new Error("Function not implemented.");
}
