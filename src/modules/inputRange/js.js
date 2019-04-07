(function() {
    function Module () {
        this.name = 'My Input Range';
        this.version = '1.0.0';

        this.createInputRange = function (options) {
            if (!options.realInput || !options.rangeBox) {
                return null;
            }
            return new InputRange(options);
        }
    }

    function InputRange(options) {
        this.realInput = typeof options.realInput === 'string' ? document.querySelector(options.realInput) : options.realInput;
        this.rangeBox = typeof options.rangeBox === 'string' ? document.querySelector(options.rangeBox) : options.rangeBox;
        this.rangeBar = this.rangeBox.children[0];
        this.value = this.realInput.value;
        this.min = this.realInput.getAttribute('min') ? this.min = this.realInput.getAttribute('min') : 0;
        this.max = this.realInput.getAttribute('max') ? this.realInput.getAttribute('max') : 100;
        this.persent = (this.max - this.min) / 100;
        this.leftPosition = (this.value - this.min) / this.persent;

        setStyleLeft(this.rangeBar, this.leftPosition);

        this.rangeBar.ondragstart = function() {
            return false;
        };

        if (options.showingValuePlace) {
            this.showingValuePlace = typeof options.showingValuePlace === 'string' ? document.querySelector(options.showingValuePlace) : options.showingValuePlace;
        }


        createRangeBoxOnmouseDown(this);
    }

    function getCoords(elem) {
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
    function createRangeBoxOnmouseDown(inputRange) {
        inputRange.rangeBox.onmousedown = function (e) {
            move(e, inputRange);
        };
    }

    function move(e, inputRange) {
        var rangeBoxCoords = getCoords(inputRange.rangeBox),
            widthRangeBox = inputRange.rangeBox.offsetWidth,
            shiftX = e.pageX - rangeBoxCoords.left,
            newPageX;

        inputRange.leftPosition = Math.round(100 / (widthRangeBox / shiftX));

        setStyleLeft(inputRange.rangeBar, inputRange.leftPosition);

        document.onmousemove = function(e) {
            if (e.pageX > rangeBoxCoords.left + widthRangeBox) {
                newPageX = rangeBoxCoords.left + widthRangeBox;
            } else if (e.pageX < rangeBoxCoords.left) {
                newPageX = rangeBoxCoords.left;
            } else {
                newPageX = e.pageX;
            }
            shiftX = newPageX - rangeBoxCoords.left;
            inputRange.leftPosition = Math.round(100 / (widthRangeBox / shiftX));
            setStyleLeft(inputRange.rangeBar, inputRange.leftPosition);
            inputRange.value = (inputRange.leftPosition * inputRange.persent) + +inputRange.min;
            inputRange.realInput.value =  inputRange.value;
            console.log(inputRange.realInput.value);
            if (inputRange.showingValuePlace) {
                inputRange.showingValuePlace.textContent = inputRange.realInput.value;
            }
        };
        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
        };
        return false;
    }

    function setStyleLeft(elem, left) {
        left = left > 0 ?
            left < 100 ?
                left :
                100 :
            0;
        elem.style.left = left + '%';
    }

    window.myInputRange = new Module();
})();
