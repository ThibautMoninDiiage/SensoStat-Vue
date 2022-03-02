import axios from 'axios'

export default class AnswerService {

    async saveUserAnswer(answer) {
        await axios.post('', {
            answer : answer
        })
    }

}
