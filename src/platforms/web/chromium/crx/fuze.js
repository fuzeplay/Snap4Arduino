//Adds extra functionality to the chrome extension in order to handle
//Fuze specific functionality

Dispatcher.prototype.setLEDColor = function (boardId, ledPin, colorCode) {
    Boards[boardId].setLEDColor(ledPin, colorCode);
}

//Used to ID this message as an LED_STRIP message
const LED_STRIP = 0x7C;
/**
 * Asks the zubi flyer to send an LED color
 * @param {number} ledPin The ledPin that you want to change. Can be set to ALL_LEDS = 0x7F to set all LEDs
 * @param {number} colorCode The colorCode that you want to set the LED(s) to. Can be set to CLEAR_LED = 0x7F to clear the LED(s)
 */
Board.prototype.setLEDColor = function(ledPin, colorCode) {
    writeToTransport(this, [
        START_SYSEX,
        LED_STRIP,
        ledPin,
        colorCode,
        END_SYSEX
    ]);
};
