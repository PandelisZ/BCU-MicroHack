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
					scope.score++;
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
			question: "Do you have a CV?",
			options: ["Yes", "No", "Maybe", "Whats a cv?"],
			answer: 2
		},
		{
			question: "Do you like pasta?",
			options: ["Whos pasta", "Ive never been to italy", "Yes", "Nope"],
			answer: 0
		},
		{
			question: "DO you want a job?",
			options: ["Yes", "Yes please", "Yes pretty please", "Nah im good"],
			answer: 3
		},
		{
			question: "What degree are you doing?",
			options: ["Computing", "Engineering", "Music", "Art"],
			answer: 0
		},
		{
			question: "Do you like azure",
			options: ["ITs aight", "AWS is better", "Atleast its better than IBM", "Everything is better than IBM"],
			answer: 1
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
