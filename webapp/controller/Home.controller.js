sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/ws/WebSocket",
	"../model/formatter"
], function(Controller, WebSocket, formatter) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.App", {

		formatter: formatter,

		onInit: function () {

		},


		onQueueReady: function (oEvent) {
			// do a one-time setup call for the web service
			if (!this._bInit) {
				var oWS = new WebSocket("wss://em-consumer-active-jaguar.cfapps.us10.hana.ondemand.com/");
				oWS.attachMessage(function (oEvent) {
					// update analytics card
					this.refresh();
				}.bind(oEvent.getSource()));
			}
			this._bInit = true;
		}
	});
});