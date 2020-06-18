sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/ws/WebSocket",
	"sap/ui/model/json/JSONModel",
	"./model/formatter"
], function(Controller, WebSocket, JSONModel, formatter) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.components.IncidentDetails.Main", {

		formatter: formatter,
		onInit: function () {
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.subscribe("Incidents", "ShowDetails", this._onIncidentDetails, this);
		},


		_onIncidentDetails: function (sChannel, sEvent, oData) {
			var sID = oData.id;

			this.getView().bindElement({
				path: "/SafetyIncidents(" + sID + ")"
			});

			this.byId("form").setVisible(true);
		},


	});
});