var PALETTE;

PALETTE = {};

(function () {
	PALETTE.app = angular.module("palette", []);

	PALETTE.app
		.controller("ColorPaletteCtrl", ["$scope", function ($scope) {
			$scope.selectedColor = new RGB(0, 0, 0);
		}])
		.controller("ControlsCtrl", ["$scope", function ($scope) {
		}])
		
		.directive("number", [function () {
			var numberParser;

			numberParser = function (number) {
				return parseInt(number);
			};

			return {
				restrict: "A",
				require: "ngModel",
				link: function ($scope, $elem, $attrs, ngModelCtrl) {
					ngModelCtrl.$parsers.push(numberParser);
				}
			};
		}])
		.directive("colorPalette", [function () {
			return {
				restrict: "A",
				link: function ($scope, $elem, $attrs) {
					var ctx;

					ctx = $elem[0].getContext("2d");
					
					$elem.on("click", function (ev) {
						var pixel = ctx.getImageData(ev.layerX, ev.layerY, 1, 1);
						var data = pixel.data;

						//var rgb = new RGB(data[0], data[1], data[2]);

						//colorBox.style.background = rgb.toColorString();

						$scope.selectedColor.r = data[0];
						$scope.selectedColor.g = data[1];
						$scope.selectedColor.b = data[2];

						$scope.$digest();
					});
				}
			};
		}])
		.directive("color", [function () {
			return {
				restrict: "A",
				link: function ($scope, $elem, $attrs) {
					$scope.$watchCollection($attrs.color, function (rgbColor) {
						$elem.css("background", rgbColor.toColorString());
						console.log(rgbColor.toColorString());
					});
				}
			};
		}])
		.directive("colorComponent", [function () {
			return {
				restrict: "A",
				scope: {
					colorComponent: "=",
					componentName: "@"
				},
				templateUrl: "directives/colorComponent.html",
				link: function ($scope, $elem, $attrs) {
				}
			};
		}]);
}());
