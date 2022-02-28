import axios from 'axios'

export default class InstructionService {

    async getInstruction() {
        const instruction = await axios.get("https://appsensostatapi.azurewebsites.net/Instruction")

        return "Sentez le savon"
    }

}
