import axios from 'axios'

export default class AnswerService {

    async saveUserAnswer(userAnswer, questionId, token, productId) {
        await axios.post('https://appsensostatapi.azurewebsites.net/Answer',
        {
            userAnswer : userAnswer,
            questionId : questionId,
            token : token,
            productId : productId
        })
    }

}
