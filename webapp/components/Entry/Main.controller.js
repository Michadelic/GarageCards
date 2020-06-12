sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/ws/WebSocket"
], function(Controller, WebSocket) {
    "use strict";

    return Controller.extend("sap.ui.demo.basicTemplate.components.Entry.Main", {

        onInit: function () {
            this._oWS = new WebSocket("ws://echo.websocket.org");

            // shared pointer for testing
            window._oWS = this._oWS;
        },

        onSave: function () {
            this._oWS.send(JSON.stringify({
                name: this.byId("name").getValue(),
                description: this.byId("description").getValue(),
                category: this.byId("category").getSelectedItem().getText(),
            }));
        }
    });
});