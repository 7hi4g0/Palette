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
		
		.directive("colorPalette", [function () {
			return {
				restrict: "A",
				controller: function ($scope, $element, $attrs) {
					var ctx;

					ctx = $element[0].getContext("2d");
					
					$element.on("click", function (ev) {
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
				controller: function ($scope, $element, $attrs) {
					$scope.$watchCollection($attrs.color, function (rgbColor) {
						$element.css("background", rgbColor.toColorString());
					});
				}
			};
		}]);
}());
