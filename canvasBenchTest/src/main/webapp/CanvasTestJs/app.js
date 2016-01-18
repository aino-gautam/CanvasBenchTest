/// <reference path="./fabricjs.d.ts" />
var App;
(function (App) {
    var myApp = (function () {
        function myApp() {
        }
        //public resizeOnMove: boolean;
        myApp.prototype.createBasicVisual = function (canvasId, numberOfElements, radiusSize) {
            if (radiusSize === void 0) { radiusSize = 5; }
            return new Visual(canvasId, numberOfElements, radiusSize);
        };
        myApp.prototype.setResizeAbility = function (interact, resize_canvas, resizeClass, outputElement, resizeOnMoveElement) {
            var resizeStart;
            var resizeCount;
            var resizeOnMove = resizeOnMoveElement.checked;
            interact(resizeClass).draggable({ onmove: window.dragMoveListener }).resizable({
                preserveAspectRatio: false,
                edges: { left: true, right: true, bottom: true, top: true }
            }).on('resizestart', function (event) {
                resizeOnMove = resizeOnMoveElement.checked;
                if (resizeOnMove) {
                    resizeStart = new Date().getTime();
                }
                resizeCount = 0;
            }).on('resizemove', function (event) {
                var target = event.target, x = (parseFloat(target.getAttribute('data-x')) || 0), y = (parseFloat(target.getAttribute('data-y')) || 0);
                // update the element's style
                target.style.width = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';
                // translate when resizing from top or left edges
                x += event.deltaRect.left;
                y += event.deltaRect.top;
                target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)';
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
                if (resizeOnMove) {
                    resize_canvas();
                    resizeCount++;
                }
            }).on('resizeend', function (event) {
                if (!resizeOnMove) {
                    resizeStart = new Date().getTime();
                    resizeCount++;
                    resize_canvas();
                }
                var elapsed = new Date().getTime() - resizeStart;
                outputElement.innerText = '         Resized ' + resizeCount + ' times in ' + elapsed / 1000 + 's';
            });
        };
        return myApp;
    })();
    App.myApp = myApp;
    var Visual = (function () {
        function Visual(canvasId, numberOfElements, radiusSize) {
            var _this = this;
            this.data = [];
            this.id = canvasId;
            this.numberOfElements = numberOfElements;
            this.radiusSize = radiusSize;
            this.canvas = document.getElementById(canvasId);
            this.canvasTop = document.createElement('canvas');
            this.canvasTop.id = this.id + 'Top';
            var wrapper = this.canvas.parentElement;
            wrapper.appendChild(this.canvasTop);
            this.setSize();
            this.data = this.getData();
            this.draw();
            this.canvasTop.addEventListener('click', function (event) { return _this.onClick(event); }, false);
        }
        Visual.prototype.onClick = function (event) {
            var x = event.layerX - this.canvasTop.offsetLeft, y = event.layerY - this.canvasTop.offsetTop;
            var clickingText = document.getElementById("clickingText");
            clickingText.innerText = "clicked on (" + x + ',' + y + ")";
            //this.drawRect(this.canvasTop.getContext('2d'), x, y, this.radiusSize * 2, 'yellow');
        };
        Visual.prototype.setSize = function () {
            this.canvasTop.width = this.canvas.width = this.canvas.parentElement.clientWidth - 20;
            this.canvasTop.height = this.canvas.height = this.canvas.parentElement.clientHeight - 20;
        };
        Visual.prototype.clear = function () {
            var context = this.canvas.getContext('2d');
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
        Visual.prototype.getData = function () {
            var result = [];
            for (var i = 0; i < this.numberOfElements; i++) {
                result.push({ x: (Math.random()), y: (Math.random()) });
            }
            return result;
        };
        Visual.prototype.setData = function () {
            this.data = this.getData();
        };
        Visual.prototype.draw = function () {
            //this.drawRects(this.canvas);
            this.drawCircles(this.canvas);
        };
        Visual.prototype.drawCircles = function (canvas) {
            var context = canvas.getContext('2d');
            var centerX = canvas.width / 2;
            var centerY = canvas.height / 2;
            //var c = new fabric.Canvas(canvas);
            for (var i = 0; i < this.numberOfElements; i++) {
                var x = this.data[i].x * canvas.width;
                var y = this.data[i].y * canvas.height;
                this.drawCircle(context, x, y, this.radiusSize, 'green');
            }
        };
        Visual.prototype.drawCircle = function (context, x, y, radius, color) {
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI, false);
            context.fillStyle = color;
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = '#003300';
            context.stroke();
            context.closePath();
        };
        Visual.prototype.drawRects = function (canvas) {
            var context = canvas.getContext('2d');
            var centerX = canvas.width / 2;
            var centerY = canvas.height / 2;
            var fillStyles = [];
            var squareSize = this.radiusSize * 2;
            for (var i = 0; i < this.numberOfElements; i++) {
                var x = this.data[i].x * canvas.width;
                var y = this.data[i].y * canvas.height;
                this.drawRect(context, x, y, this.radiusSize * 2, 'green');
            }
        };
        Visual.prototype.drawRect = function (context, x, y, squareSize, color) {
            context.fillStyle = color;
            context.fillRect(x, y, squareSize, squareSize);
            context.lineWidth = 1;
            context.strokeStyle = '#000000';
            context.strokeRect(x, y, squareSize, squareSize);
        };
        Visual.prototype.toSvg = function () {
            //var c = new fabric.Canvas('myCanvas');
            var object = fabric.util.object.clone(this.canvas.getActiveObject());
            var c = new fabric.Canvas(object);
            c.calcOffset();
            var opt = {
                encoding: "utf8",
                suppressPreamble: false,
                viewBox: { x: 0, y: 0, width: 1600, height: 700 }
            };
            return c.toSVG(opt);
        };
        return Visual;
    })();
    App.Visual = Visual;
})(App || (App = {}));
//# sourceMappingURL=app.js.map