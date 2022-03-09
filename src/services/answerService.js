import axios from "axios";

export default class AnswerService {
  async postAnswer() {
    return new Promise((resolve) => {
      axios
        .post("https://appsensostatapi.azurewebsites.net/Answer", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJmYW1pbHlfbmFtZSI6InBsb3AiLCJqdGkiOiI5ZDNkZjEwYy1iZDFkLTQ1ZTMtYjM3ZC02OGZkZjc3ZDhjZTYiLCJuYmYiOjE2NDY4MjM2OTQsImV4cCI6MTY0NzQyODQ5MywiaWF0IjoxNjQ2ODIzNjk0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDE5IiwiYXVkIjoiU2Vuc29TdGF0V2ViLkFwaSJ9.hrHWntXxISmKFsgBzB6pJ96rVBw_vlpbuQ4jOVITvIs`,
          },
        })
        .then((response) => {
          resolve(response.data);
        });
    });
  }
}
