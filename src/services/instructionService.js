import axios from 'axios'

export default class InstructionService {

    async getInstruction() {
        // const instruction = await axios.get("https://appsensostatapi.azurewebsites.net/Instruction")

        var instructionss = [
            {
                Id : 1,
                Libelle : "Mangez le produit",
                Position : 1,
                SurveyId : 1
            },
            {
                Id : 2,
                Libelle : "Sentez le produit",
                Position : 2,
                SurveyId : 1
            }
        ]

        return instructionss
    }

}
