import axios from 'axios'

export default class QuestionService {

    async getQuestion() {
        const question = await axios.get('https://appsensostatapi.azurewebsites.net/Question')

        return 'Quelle odeur a le savon ?'
    }

}
