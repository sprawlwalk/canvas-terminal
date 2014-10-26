/*

	* Canvas Terminal *

	-- Web command line configurable --
		(HTML5: Canvas Tag + Javascrpit)

*/
(function(canvasTerminal, undefined) {
    "use strict";
    
    var terminalArray = [],
        terminalCounter = 0;
    
    /* Public methods */
    canvasTerminal.create = function(params) {
        var ctx1 = checkCanvasSupport(params.canvasId.cText),
            ctx2 = checkCanvasSupport(params.canvasId.cBg),
            currentTerminal;

        if ((ctx1) && (ctx2)){
            params.ctx = {'cText': ctx1, 'cBg': ctx2 };
            currentTerminal = {
                id: terminalCounter++,
                terminal: new Terminal(params)
            };
            
            terminalArray.push(currentTerminal);
            return (currentTerminal.id);
        }
    };
    
    canvasTerminal.startTerminal = function (terminalId) {
        launchAction('run', terminalId);
    };
    
    canvasTerminal.stopTerminal = function (terminalId) {
        launchAction('stop', terminalId);
    };
    
    canvasTerminal.resetTerminal = function (terminalId) {
        launchAction('reset', terminalId);
    };
    
    /* Private methods */
    function giveMeTerminalPosition(terminalId) {
        for (var i = 0; i < terminalArray.length; i++) {
            if (terminalId === terminalArray[i].id) {
                return i;
            }
        }        
        return -1;
    }
    
    function launchAction(action, id) {
        var position = giveMeTerminalPosition(id),
            currentTerminal;
    
        if (position >= 0) {
            currentTerminal = terminalArray[position];
            if(typeof(currentTerminal) !== 'undefined'){
                currentTerminal.terminal[action]();
            }
        }        
    }
    
}( window.canvasTerminal = window.canvasTerminal || {} ));