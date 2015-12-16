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
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score = scope.score + 10;
					scope.correctAns = true;
				} else {
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
			answer: 0
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
			options: ["Hell yeah", "Yes", "No", "A C what now?"],
			answer: 0
		},
		{
			question: "Does it include a Personal Statement",
			options: ["Yes", "No"],
			answer: 0
		},
		{
			question: "Does your CV include the following?",
			options: ["About You", "Skills", "Languages"],
			answer: 0
		},
		{
			question: "Does it include your Employment/Work Experience?",
			options: ["Related Skills", "Previous/Current Job", "What were your roles?"],
			answer: 0
		},
		{
			question: "Does it include hobbies and interests?",
			options:["Volunteering", "Personal Life", "Social Life"],
			answer: 0
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
