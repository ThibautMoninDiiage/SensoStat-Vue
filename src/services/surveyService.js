import axios from "axios";

export default class SurveyService {
	async getSurvey(token) {
		return new Promise((resolve) => {
		axios.get("https://appsensostatapi.azurewebsites.net/Survey?surveyId=54", {
			headers : {
				"Content-Type" : "application/json",
				Authorization : `Bearer ` + token,
			},
			})
			.then((response) => {
				resolve(response.data)
			})
		})
	}
}
