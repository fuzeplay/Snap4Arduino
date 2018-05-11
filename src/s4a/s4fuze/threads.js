
//Constants
const TRIANGLE_BUTTON_PIN = 10,
    CIRCLE_BUTTON_PIN = 2,
    SQUARE_BUTTON_PIN = 8,
    BUTTON_ONE_PIN = 7,
    BUTTON_TWO_PIN = 5,
    BUTTON_THREE_PIN = 9,
    BUZZER_PIN =  3, //Digital 3 (I don't think it's working atm due to these pins also being used for RX/TX)
    LIGHT_SENSOR_PIN = 3; //Analog 3

//LED Strip
const ALL_LEDS = 0x7F; //This means you change all LEDs
const CLEAR_LED = 0x7F; //This means clear the selected LEDs

//Codes for colors
const COLOR_RED = 0x00;
const COLOR_GREEN = 0x01;
const COLOR_BLUE = 0x02;
const COLOR_PURPLE = 0x03;
const COLOR_TURQUOISE = 0x04;
const COLOR_WHITE = 0x05;
const COLOR_PINK = 0x06;


Process.prototype.zubiButtonState = function (button) {
    console.log("Reading button state: "+button[0]);
    //Need to flip this boolean since this function reports the opposite state
    return !this.reportDigitalReading(getButtonPin(button[0]));
};


Process.prototype.zubiLightSensorWhen = function (op, value) {
    const difference = this.reportAnalogReading(LIGHT_SENSOR_PIN) - value;
    return isDifferenceConditionMet(op[0], difference);
};


Process.prototype.zubiLightSensorReadInput = function () {
    return this.reportAnalogReading(LIGHT_SENSOR_PIN);
};


Process.prototype.zubiSetLedToColor = function (ledPin, color) {
    var sprite = this.blockReceiver();

    this.popContext();
    sprite.startWarp();
    this.pushContext('doYield');

    if (!this.isAtomic) {
        this.pushContext('doStopWarping');
    }

    if (sprite.arduino.isBoardReady()) {
        var board = sprite.arduino.board;
        //If you didn't pass a CLEAR_LED value as color, calculate the color code from the color string passed instead
        var colorCode;
        if (color !== CLEAR_LED) {
            colorCode = getColorCode(color[0]);
        } else {
            colorCode = CLEAR_LED;
        }
        board.setLEDStripColor(ledPin, colorCode);
    } else {
        throw new Error(localize('Arduino not connected'));
    }

    this.isAtomic = true;

    this.pushContext();
};


Process.prototype.zubiSetAllLedsToColor = function (color) {
    return this.zubiSetLedToColor(ALL_LEDS, color);
};


Process.prototype.zubiClearAllLeds = function () {
    return this.zubiSetLedToColor(ALL_LEDS, CLEAR_LED);
};


Process.prototype.zubiClearLed = function (ledPin) {
    return this.zubiSetLedToColor(ledPin, CLEAR_LED);
};


isDifferenceConditionMet = function(op, difference) {
    switch (op) {
        case ">":
            return difference > 0;
        case "==":
            return difference === 0;
        case "<":
            return difference <0;
        case ">=":
            return difference >= 0;
        case "<=":
            return difference <= 0;
        default:
            return null;
    }
};

getButtonPin = function(button) {
    switch (button) {
        case "triangle":
            return TRIANGLE_BUTTON_PIN;
        case "square":
            return SQUARE_BUTTON_PIN;
        case "circle":
            return CIRCLE_BUTTON_PIN;
        case "button one":
            return BUTTON_ONE_PIN;
        case "button two":
            return BUTTON_TWO_PIN;
        case "button three":
            return BUTTON_THREE_PIN;
        default:
            return null;
    }
};

//Convert a color string to a colorCode (that is passed to the Arduino/ Fuze)
getColorCode = function(color) {

    switch (color) {
        case "red":
            return COLOR_RED;
        case "green":
            return COLOR_GREEN;
        case "blue":
            return COLOR_BLUE;
        case "purple":
            return COLOR_PURPLE;
        case "turquoise":
            return COLOR_TURQUOISE;
        case "white":
            return COLOR_WHITE;
        case "pink":
            return COLOR_PINK;
        case 0x7F:
            //Clear it
            return CLEAR_LED;
        default:
            //Clear it
            return CLEAR_LED;
    }
};