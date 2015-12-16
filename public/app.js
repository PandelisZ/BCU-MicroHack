var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answer2 = q.answer2;
					scope.answer3 = q.answer3;
					scope.answer4 = q.answer4;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score = scope.score + 20;
					scope.correctAns = true;
				} else if (ans == scope.options[scope.answer2]) {
					scope.score = scope.score + 10;
					scope.correctAns = false;
				}else if (ans == scope.options[scope.answer3]) {
					scope.score = scope.score + 5;
					scope.correctAns = false;
				}else if (ans == scope.options[scope.answer4]) {
					scope.score = scope.score + 1;
					scope.correctAns = false;
				}

				scope.answerMode = false;


			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question: "What are your plans after university?",
			options: ["Internship", "Graduate Job", "Full Time Job", "Continued Study", "Unsure"],
			answer: 2,
			answer2: 1,
			answer3: 0,
			answer4: 3
		},
		{
			question: "Have you worked part time during university?",
			options: ["Yes", "No"],
			answer: 0
		},
		{
			question: "Do you have a cover letter?",
			options: ["Yes", "No", "What is a cover letter?"],
			answer: 0
		},
		{
			question: "Have you got a CV?",
			options: ["Hell yeah", "No", "A C what now?"],
			answer: 0,
		},
		{
			question: "Does it include a Personal Statement",
			options: ["Yes", "No"],
			answer: 0
		},
		{
			question: "Have you uncluded an About You section?",
			options: ["Yes", "No"],
			answer: 0
		},
		{
			question: "Does it include a Skills section?",
			options: ["Yes", "No"],
			answer: 0
		},
		{
			question: "Did you list the languages you can speak?",
			options: ["Yes", "No"],
			answer: 0
		},
		{
			question: "How many pages long is your CV?",
			options: ["1", "2", "3", ">3"],
			answer: 1,
			answer2: 0,
			answer3: 2,
			answer4: 3
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});
