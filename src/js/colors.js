var myColorCalc = new ColorsCalc(),
    reg = /[а-яА-ЯёЁ]/g;

rgbValue.onkeydown = function (e) {
    if (this.value.search(reg) != -1) {
        this.value = this.value.replace(reg, '');
    }
    if (e.key === 'Enter') {
        resultHex.onclick();
    }
};

hexValue.onkeydown = function (e) {
    if (this.value.search(reg) != -1) {
        this.value = this.value.replace(reg, '');
    }
    if (e.key === 'Enter') {
        resultRgb.onclick();
    }
};

firstVal.onkeydown = function(e) {
    if (this.value.search(reg) != -1) {
        this.value = this.value.replace(reg, '');
    }
    if (e.key === 'Enter') {
        resultAverage.onclick();
    }
};

secondVal.onkeydown = function(e) {
    if (this.value.search(reg) != -1) {
        this.value = this.value.replace(reg, '');
    }
    if (e.key === 'Enter') {
        resultAverage.onclick();
    }
};

resultHex.onclick = function () {
    var result = myColorCalc.rgbToHex(rgbValue.value);
    rgbResult.textContent = result;
    rgbResult.style.color = result;
};

resultRgb.onclick = function () {
    var result = myColorCalc.hexToRgb(hexValue.value);
    hexResult.textContent = result;
    hexResult.style.color = result;
};

resultAverage.onclick = function () {
    var result = myColorCalc.averageColor(firstVal.value, secondVal.value);
    averageResult.textContent = result;
    averageResult.style.color = result;
};

function ColorsCalc() {
    this.createRgbArray = function (number) {
        number = myParceIntAll(number);
        var rgb = number.split('.');
        rgb.length = 3;
        for (var key in rgb) {
            rgb[key] = +rgb[key];
            rgb[key] > 255 ?
                rgb[key] = 255 :
                rgb[key] < 0 ?
                    rgb[key] = 0:
                    rgb[key];
        }
        return rgb;
    };

    this.createHexArray = function (hex) {
        if (hex.length > 3) {
            if (hex.length < 6) {
                hex = hex.match(/[\s\S]{1,1}/g);
                hex.length = 4;
            } else if (hex.length > 6) {
                hex = hex.match(/[\s\S]{1,2}/g);
                hex.length = 4;
            } else {
                hex = hex.match(/[\s\S]{1,2}/g);
            }
        } else {
            hex = hex.match(/[\s\S]{1,1}/g);
        }

        for (var key in hex) {
            if (hex[key].length == 1) {
                hex[key] += hex[key];
            }
        }

        return hex;
    };

    this.hexToRgb = function (hex) {
        hex = hex.indexOf('#') >= 0 ? hex.substring(hex.indexOf('#') + 1) : hex;
        if (!checkCorrectHex(hex)) {
            return 'Incorrect input!';
        }

        hex = this.createHexArray(hex);
        for (var i = 0; i < hex.length; i++) {
            hex[i] = parseInt(hex[i], 16);
            if (isNaN(hex[i])) {
                return 'Incorrect input!';
            }
        }
        return hex.length > 3 ? 'rgba(' + hex.join(',') + ')' : 'rgb(' + hex.join(',') + ')';
    };

    this.rgbToHex = function (rgb) {
        if(rgb.isEmpty()){
            return 'Please, input colors';
        }
        rgb = this.createRgbArray(rgb);
        for (var key in rgb) {
            rgb[key] = decToHex(+rgb[key])
        }
        return '#'+ rgb.join('');
    };

    this.averageColor = function (value1, value2) {
        if (!value1 || !value2) {
            return 'Please, input colors';
        }
        value1 = value1.indexOf('#') >= 0 ? value1.substring(value1.indexOf('#') + 1) : value1;
        value2 = value2.indexOf('#') >= 0 ? value2.substring(value2.indexOf('#') + 1) : value2;
        if (!checkCorrectHex(value1) || !checkCorrectHex(value2)) {
            return 'Incorrect input!';
        }

        value1 = this.createHexArray(value1);
        value2 = this.createHexArray(value2);

        for (var i = 0; i < value1.length; i++) {
            value1[i] = parseInt(value1[i], 16);
            if (isNaN(value1[i])) {
                return 'Incorrect input!';
            }
        }
        for (i = 0; i < value2.length; i++) {
            value2[i] = parseInt(value2[i], 16);
            if (isNaN(value2[i])) {
                return 'Incorrect input!';
            }
        }

        var averageCol = [];
        for (i = 0; i < value1.length; i++) {
            averageCol[i] = decToHex(Math.round((+value1[i] + +value2[i]) / 2));
        }
        averageCol.length = Math.min(value1.length, value2.length);

        return '#' + averageCol.join('');
    };
}

function checkCorrectHex(hex) {
    if(hex.isEmpty()){
        return false
    }
    if (!parseInt(hex, 16) && parseInt(hex, 16) !== 0){
        return false;
    }
    if (hex.length < 3) {
        return false;
    }
    return hex;
}

function decToHex(number) {
    var result = number.toString(16);
    if (result.length % 2) {
        result = '0' + result;
    }
    return result;
}

function myParceIntAll(text) {
    var result = [];
    for (var key in text) {
        (!isNaN(text[key])) ?
            result.push(text[key]) :
            text[key] == '.' ?
                result.push(text[key]) :
                text[key] == ',' ?
                    result.push('.') :
                    result;
    }
    return result.join('');
}

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};
