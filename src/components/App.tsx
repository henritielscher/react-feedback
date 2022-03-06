import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import FeedbackList from "./FeedbackList";
import FeedbackStats from "./FeedbackStats";
import FeedbackForm from "./FeedbackForm";
import AboutPage from "../pages/AboutPage";
import AboutIconLink from "./AboutIconLink";
import { FeedbackProvider } from "../context/FeedbackContext";

function App() {
	return (
		<FeedbackProvider>
			<Router>
				<Header />
				<div className="container">
					<Routes>
						<Route
							path="/"
							element={
								<>
									<FeedbackForm />
									<FeedbackStats />
									<FeedbackList />
								</>
							}
						/>
						<Route path="/about" element={<AboutPage />} />
					</Routes>
					<AboutIconLink />
				</div>
			</Router>
		</FeedbackProvider>
	);
}

export default App;
