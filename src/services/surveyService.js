import axios from "axios";

export default class SurveyService {
	async getSurvey(token) {
		return new Promise((resolve) => {
		axios.get("https://appsensostatapi.azurewebsites.net/Survey/Token?token=" + token)
			.then((response) => {
				resolve(response.data)
			})
		})
	}
}
