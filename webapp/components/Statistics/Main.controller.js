sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/ws/WebSocket",
	"sap/ui/model/json/JSONModel",
], function(Controller, WebSocket, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.components.Statistics.Main", {

		onInit: function () {
			var fnWaitForWS = function () {
				var oWS = window._oWS;

				if (!oWS) {
					window.setTimeout(fnWaitForWS, 100); /* this checks the flag every 100 milliseconds*/
				} else {
					oWS.attachMessage(function (oEvent) {
						var sMessage = oEvent.getParameter("data");
						this._reload(sMessage);
					}.bind(this));
				}
		   }.bind(this);
		   fnWaitForWS();

		   var oModel = new JSONModel([]);
		   this.getView().setModel(oModel, "entries");
		},

		_reload: function (sMessage) {
			var aResult = JSON.parse(sMessage);
			//alert(aResult.name + " " + aResult.description + " " + aResult.category);
			var oModel = this.getView().getModel("entries");
			var aEntries = oModel.getData();
			aEntries.push({
				name: aResult.name,
				description: aResult.description,
				category: aResult.category
			});
			oModel.setData(aEntries);

		}
	});
});