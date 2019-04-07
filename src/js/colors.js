var myColorCalc = new ColorsCalc(),
    reg = /[а-яА-ЯёЁ]/g;

rgbValue.onkeydown = function (e) {
    if (this.value.search(reg) !=  -1) {
        this.value = this.value.replace(reg, '');
    }
    if (e.key === 'Enter') {
        resultHex.onclick();
    }
};

hexValue.onkeydown = function (e) {
    if (this.value.search(reg) !=  -1) {
        this.value = this.value.replace(reg, '');
    }
    if (e.key === 'Enter') {
        resultRgb.onclick();
    }
};

firstVal.onkeydown = function(e) {
    if (this.value.search(reg) !=  -1) {
        this.value = this.value.replace(reg, '');
    }
    if (e.key === 'Enter') {
        resultAverage.onclick();
    }
};

secondVal.onkeydown = function(e) {
    if (this.value.search(reg) !=  -1) {
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

    this.createHexArray = function (number) {
        number = number.substring(number.indexOf('#') + 1);
        var hex = [];
        number = number.length > 8 ?  number.substring(0,8) : number;
        if (number.length < 3) {
            for (var i = number.length; i < 3; i ++) {
                number += 0;
            }
        }
        if (number.length > 3 && number.length < 6) {
            hex = [number.substring(0,1), number.substring(1,2), number.substring(2,3), parseInt(number.substring(3,4), 16)];
            return hex;
        }
        if (number.length > 6) {
            hex = [number.substring(0,2), number.substring(2,4), number.substring(4,6), number.substring(6)];
            if (hex[3].length == 1) {
                hex[3] += hex[3];
            }
            if (!parseInt(hex[3], 16)) {
                hex.length = 3;
            } else {
                hex[3] = parseInt(hex[3], 16)
            }
            return hex;
        }
        if (number.length == 3) {
            hex = [number.substring(0,1), number.substring(1,2), number.substring(2,3)];
            for (var key in hex) {
                hex[key] += hex[key];
            }
            return hex;
        }
        if (number.length == 6) {
            hex = [number.substring(0,2), number.substring(2,4), number.substring(4,6)];
            return hex;
        }
        return hex;
    };

    this.hexToRgb = function (hex) {
        if(hex.isEmpty()){
            return false
        }
        hex = this.createHexArray(hex);

        hex[0] = parseInt(hex[0], 16);
        hex[1] = parseInt(hex[1], 16);
        hex[2] = parseInt(hex[2], 16);
        for (var i = 0; i < 3; i++) {
            if (!hex[i] && hex[i] !== 0) {
                return 'Incorrect input!';
            }
        }

        if (hex.length > 3) {
            hex[3] = hex[3] / 100;
            return 'rgba(' + hex.join(',') + ')';
        }

        return 'rgb(' + hex.join(',') + ')';

    };

    this.rgbToHex = function (rgb) {
        if(rgb.isEmpty()){
            return false
        }
        var hex;
        rgb = this.createRgbArray(rgb);
        for (var key in rgb) {
            rgb[key] = decToHex(+rgb[key])
        }
        hex = '#'+ rgb[0] + rgb[1] + rgb[2];
        return hex;
    };

    this.averageColor = function (value1, value2) {
        if (!value1 || !value2) {
            return 'Please, input colors';
        }
        value1 = this.createValueForAverage(value1);
        value2 = this.createValueForAverage(value2);

        var averageCol = [];
        averageCol[0] = (parseInt(value1[0], 16) + parseInt(value2[0], 16)) / 2;
        averageCol[1] = (parseInt(value1[1], 16) + parseInt(value2[1], 16)) / 2;
        averageCol[2] = (parseInt(value1[2], 16) + parseInt(value2[2], 16)) / 2;

        for (var key in averageCol) {
            averageCol[key] = Math.round(averageCol[key])
        }

        return 'rgb(' + averageCol.join(',') + ')';

    };

    this.createValueForAverage = function(value){
        value = value.substring(value.indexOf('#') + 1);
        if(!parseInt(value, 16)){
            value = this.createRgbArray(value);
            for (var key in value) {
                value[key] = decToHex(value[key]);
            }
            return value;
        } else {
            var newValue = [];
            newValue[0] = value.substring(0,2);
            newValue[1] = value.substring(2,4);
            newValue[2] = value.substring(4);
            return newValue;
        }
    };
}

function decToHex(number) {
    var result = number.toString(16)
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
