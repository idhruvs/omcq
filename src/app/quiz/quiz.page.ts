import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { AuthenticationService } from "../providers/authentication/authentication.service";
import { StartquizPage } from "../startquiz/startquiz.page";
import { AlertController } from "@ionic/angular";
@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.page.html",
  styleUrls: ["./quiz.page.scss"]
})
export class QuizPage implements OnInit {
  userInfo: any = {};
  maxQuestions: any = 10;
  questionsIndices = [];
  questions: any;
  currentQuestionIndex = 0;
  currentQuestion: any;
  currentSelectedOption: any;
  textResponse: any = "";
  responses: any = [];
  hasQuizCompleted: boolean = false;
  score = { motivation: 0, creativity: 0, expertise: 0 };
  constructor(
    public navCtrl: NavController,
    private authService: AuthenticationService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.questionsIndices = this.initializeRandomArray();
    console.log(this.questionsIndices);
    this.startQuiz();
    this.userInfo = JSON.parse(localStorage.getItem("user"));
  }

  async presentSuccessAlert() {
    let alert = await this.alertCtrl.create({
      header: "Awesome",
      subHeader: "",
      message:
        "We'd like to present some recommendations based on your performance. Visit Recommendations tab for more information",
      buttons: ["OK"]
    });
    return await alert.present();
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex <= this.maxQuestions - 1) {
      this.currentSelectedOption = null;
      this.textResponse = "";
      this.postQuestion();
    } else {
      this.hasQuizCompleted = true;
      this.calculateScore();
      this.postResponse(this.prepareDataForStorage());
    }
  }

  postResponse(response) {
    this.authService.post(response, "classes/responses").then(response => {
      console.log("Post response", response);
      this.postScore();

      this.presentSuccessAlert();
    });
  }

  postScore() {
    this.authService
      .post({ ...this.score, userId: this.userInfo.username }, "classes/scores")
      .then(response => {
        console.log("Score response: ", response);
        this.generateRecommendations();

        this.presentSuccessAlert();
      });
  }

  generateRecommendations() {
    this.authService
      .post(
        { username: this.userInfo.username },
        "recommendations/generate",
        true
      )
      .then(res => {
        console.log("Generate Recommendations", res);
        // this.navCtrl.navigateRoot("tabs");
      });
  }

  prepareDataForStorage() {
    let userRecord: any = {};
    userRecord.userId = this.userInfo.username;
    this.responses.forEach(response => {
      userRecord[`q${response.id}`] = response.userResponse;
    });
    return userRecord;
  }

  recordAnswer(currentQuestion, option) {
    let responseIndex = 0;
    this.currentSelectedOption = option;

    if (this.responses.length !== 0) {
      responseIndex = this.responses.length - 1;
    }

    if (
      this.responses.length > 0 &&
      currentQuestion.question === this.responses[responseIndex].question
    ) {
      this.responses[responseIndex].userResponse = option;
    } else {
      currentQuestion.userResponse = option;
      this.responses.push(currentQuestion);
    }

    console.log(this.responses);
  }

  calculateScore() {
    this.responses.forEach(response => {
      if (response.hasSingleAnswer) {
        if (response.correctAnswer == response.userResponse) {
          this.score[`${response.type}`] += 1;
        }
      }
      if (response.hasOptions) {
        const optionScore = response.options.indexOf(response.userResponse);
        this.score[`${response.type}`] += optionScore;
      }
      if (response.requiresTextAnalysis) {
        this.score[`${response.type}`] += parseInt(Math.random().toFixed(2));
      }
      console.log(response.type, this.score);
    });
  }

  recordTextualAnswer(currentQuestion, option) {
    this.recordAnswer(currentQuestion, option);
    this.moveToNextQuestion();
  }

  postQuestion() {
    console.log("Posting new question");
    this.currentQuestion = this.questions.filter(
      question =>
        question.id === this.questionsIndices[this.currentQuestionIndex]
    )[0];
    console.log(this.currentQuestion);
  }

  startQuiz() {
    this.authService.getQuestion().then((res: any) => {
      this.questions = res.results;
      this.postQuestion();
    });
  }

  initializeRandomArray() {
    function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }

    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return shuffle(arr);
  }

  terminateQuiz() {
    this.navCtrl.navigateRoot("");
  }
}
