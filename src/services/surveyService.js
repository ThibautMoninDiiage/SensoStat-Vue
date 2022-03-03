import axios from 'axios'

export default class SurveyService {

    async getSurveyByUserId() {
        const survey = await axios.get('https://appsensostatapi.azurewebsites.net/Survey')

        return survey.data
    }

}
