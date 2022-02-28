import axios from 'axios'

export default class QuestionService {

    async getQuestion() {
        // const question = await axios.get('https://appsensostatapi.azurewebsites.net/Question')

        var questionss = [
            {
                Id : 1,
                Libelle : "Avez vous trouvé le produit bon ?",
                Position : 1
            },
            {
                Id : 2,
                Libelle : "Avez vous trouvé que le produit sentait bon ?",
                Position : 2
            }
        ]

        return questionss 
    }

}
